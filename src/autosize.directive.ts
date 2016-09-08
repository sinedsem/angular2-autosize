import { ElementRef, HostListener, Directive} from '@angular/core';

@Directive({
    selector: 'textarea[autosize]'
})

export class Autosize {
    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
    }

    ngAfterContentChecked(): void {
        this.adjust();
    }

    adjust(): void {
        var elem = this.element.nativeElement; //let's shorten lines a little

        // save current margin-bottom
        let style = elem.currentStyle || window.getComputedStyle(elem);
        let marginBottom = style.marginBottom ? parseInt(style.marginBottom) : 0;

        elem.style.overflow = 'hidden';

        // add current height in order not to lose window scroll position due to textarea collapse
        elem.style.marginBottom = marginBottom + elem.offsetHeight + "px";
        elem.style.height = 'auto';
        elem.style.height = elem.scrollHeight + 3 + "px"; // +3 added due to Mirefox cutting text a little
        elem.style.marginBottom = marginBottom + "px"; // restore original margin
    }
}
