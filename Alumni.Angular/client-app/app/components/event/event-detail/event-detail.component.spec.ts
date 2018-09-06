import { TestBed, inject } from '@angular/core/testing';

import { EventDetailComponent } from './event-detail.component';

describe('a event-detail component', () => {
	let component: EventDetailComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				EventDetailComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([EventDetailComponent], (EventDetailComponent) => {
		component = EventDetailComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});