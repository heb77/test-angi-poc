import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from "@angular/platform-browser";

@Pipe({ name: 'ASB_Filter', pure: false })
export class filterPipe implements PipeTransform {
    transform(data: any, property: string, filteredValue: string | null) {
        if (data.length === 0) {
            return data;
        }
        const resultArray = [];
        for (const item of data) {
            if (item[property] === filteredValue) {
                resultArray.push(item);
            }
        }
        return resultArray;
    }
}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) { }

    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error('Invalid safe type specified: ${type}');
        }
    }

}

