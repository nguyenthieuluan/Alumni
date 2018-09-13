import { Pipe, PipeTransform } from "@angular/core";
import { SecurityContext, VERSION } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
  name: "n2br"
})
export class N2BrPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, sanitizeBeforehand?: boolean): string {
    if (typeof value !== "string") {
      return value;
    }
    let result: any;
    const textParsed = value.replace(/(?:\r\n|\r|\n)/g, "<br />");

    if (!VERSION || VERSION.major === "2") {
      result = this.sanitizer.bypassSecurityTrustHtml(textParsed);
    } else if (sanitizeBeforehand) {
      result = this.sanitizer.sanitize(SecurityContext.HTML, textParsed);
    } else {
      result = textParsed;
    }

    return result;
  }
}
