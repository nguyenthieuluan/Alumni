import { Input, Component, EventEmitter, ElementRef, ViewChild, Output, Injector } from "@angular/core";
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { PostDetailDto, Picture, PostData, PostServiceProxy } from "@shared/service-proxies/service-proxies";
import { forEach } from "@angular/router/src/utils/collection";
import { identifierModuleUrl } from "@angular/compiler";
import { AppConsts } from "@shared/AppConsts";
import { TokenService } from '@abp/auth/token.service';
import { AppComponentBase } from "@shared/app-component-base";

@Component({
    selector: 'post-editor',
    templateUrl: './post-editor.component.html',
})
export class PostEditorComponent extends AppComponentBase   {
    @Input() post?: PostDetailDto;
    @Output() onPostAdded = new EventEmitter<PostDetailDto>();
   
    @ViewChild('imgQueue') imgQueue: ElementRef;
    options: UploaderOptions;
    formData: FormData;
    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    private isEditMode: boolean = false;
    uploadRemains : number = 0;
    private baseUrl: string;
    constructor(
        injector: Injector,
        private _postService: PostServiceProxy,
        private _tokenService: TokenService
    ) {

        super(injector);
        this.options = { concurrency: 8, maxUploads: 30 };
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
        this.setPost(this.post);
    }

    submitPost(): void {
        if (this.uploadRemains > 0) {
            return;
        }
        if (!this.post.contentText) {
            this.post.contentText = '';
        }
       
        if (this.isEditMode) {
            this._postService.editPost(this.post).subscribe((result: PostDetailDto) => {
                this.setPost();
            });
        } else {
            this._postService.addPost(this.post).subscribe((result: PostDetailDto) => {
                this.onPostAdded.emit(result);
                this.setPost()
            });
        }
    }

    setPost(p?: PostDetailDto){
        if (!p) {
            this.post = new PostDetailDto();
            this.post.postData = new PostData();
            
            this.isEditMode = false;
        } else {
            this.post = p;
            this.isEditMode = true;
        }
    }
    addPostPicture(pi: Picture) {
        if (!this.post.postData.pictures) {
            this.post.postData.pictures = [];
        }

        this.post.postData.pictures.push(pi);
    }
    removePostPicture(pi: Picture) {
       
        this.post.postData.pictures.filter((p: Picture) => p.seoFilename !== pi.seoFilename);
    }
    resetEditor() {
        this.setPost();
    }
    ///upload stuffs
    onUploadOutput(output: UploadOutput): void {
        var pi = new Picture();
        if (output.type === 'allAddedToQueue') { // when all files added in queue
            // uncomment this if you want to auto upload files when added
           
                var token = this._tokenService.getToken();
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: AppConsts.remoteServiceBaseUrl + '/api/Upload/UploadFile',
                    method: 'POST',
                    headers: {
                     
                        "Authorization": "Bearer " + token, 
                    },
                    // data: { id: output.file.id }
                };
                this.uploadInput.emit(event);
        } else   if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            if (output.file.type.startsWith('image/')) {
                this.files.push(output.file);
            }
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'start') {
            // remove file from array when removed
            this.uploadRemains++;
            pi.seoFilename = output.file.id;
            pi.isNew = true;
            pi.thumbUrl = "/theme/img/ajax-loader.gif";
            this.addPostPicture(pi);
        } else if (output.type === 'done') {
            // remove file from array when removed
            if (output.file.response.success) {
               // debugger;
                this.post.postData.pictures.filter((p: Picture) => p.seoFilename === output.file.id)[0].guid = output.file.response.result.guid;
                this.post.postData.pictures.filter((p: Picture) => p.seoFilename === output.file.id)[0].thumbUrl = output.file.response.result.thumbUrl;
                this.post.postData.pictures.filter((p: Picture) => p.seoFilename === output.file.id)[0].pictureUrl = output.file.response.result.pictureUrl;
               
            } else {
                this.removePostPicture(pi);
            }
            this.uploadRemains--;
        }
    }
    setImgData(data: any, file: UploadFile): void {
        //file.sub = data;
    }
    removeFile(id: string): void {
       
        this.post.postData.pictures = this.post.postData.pictures.filter((p: Picture) => p.seoFilename !== id);
    }
    removeAllFiles(): void {
        this.uploadInput.emit({ type: 'removeAll' });
    }
    ///
}
