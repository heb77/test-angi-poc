import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { ToasterPosition } from "src/models/toast.model";

@Injectable({ providedIn: 'root' })
export class ASBToastService {

    constructor(
        private toastr: ToastrService) { }


    asbSuccessToastr(bodyText: string, titleText: string, position: ToasterPosition, timeOut: number, progressBar: boolean) {
        this.toastr.success(bodyText, titleText, { positionClass: position, timeOut: timeOut, progressBar: progressBar })
    }

    asbErrorToastr(bodyText: string, titleText: string, position: ToasterPosition, time: number, bar: boolean) {
        this.toastr.error(bodyText, titleText, { positionClass: position, timeOut: time, progressBar: bar })
    }

    asbWarningToastr(bodyText: string, titleText: string, position: ToasterPosition, time: number, bar: boolean) {
        this.toastr.warning(bodyText, titleText, { positionClass: position, timeOut: time, progressBar: bar })
    }

    asbInfoToastr(bodyText: string, titleText: string, position: ToasterPosition, time: number, bar: boolean) {
        this.toastr.info(bodyText, titleText, { positionClass: position, timeOut: time, progressBar: bar })
    }
}