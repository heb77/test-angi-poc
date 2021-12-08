import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { TasklistComponent } from "./tasklist/tasklist.component";
import { HomeComponent } from "./home/home.component";
import { SingleTaskComponent } from "./single-task/single-task.component";
import { CheckSignaturesComponent } from "./zahlungsauftrag/check-signatures/check-signatures.component";
import { DocumentSigningComponent } from "./zahlungsauftrag/document-signing/document-signing.component";
import { ErrorComponent } from "./zahlungsauftrag/error/error.component";
import { InlandComponent } from "./zahlungsauftrag/inland/inland.component";
import { SelectMaccComponent } from "./zahlungsauftrag/select-macc/select-macc.component";
import { ShowResultComponent } from "./zahlungsauftrag/show-result/show-result.component";
import { SwiftComponent } from "./zahlungsauftrag/swift/swift.component";
import { ExampleComponent } from "./example/example.component";

const appRoutes: Routes = [
    { path: 'example', component: ExampleComponent },
    { path: '', component: HomeComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'home', component: HomeComponent },
    { path: 'tasks', component: TasklistComponent },
    { path: 'singletask/:id', component: SingleTaskComponent },
    { path: 'zahlungsauftrag/processInstance/maccselection/processInstanceId/:processInstanceId/id/:id', component: SelectMaccComponent },
    { path: 'zahlungsauftrag/processInstance/inland/processInstanceId/:processInstanceId/id/:id', component: InlandComponent },
    { path: 'zahlungsauftrag/processInstance/swift/processInstanceId/:processInstanceId/id/:id', component: SwiftComponent },
    { path: 'zahlungsauftrag/processInstance/docSigning/processInstanceId/:processInstanceId/id/:id', component: DocumentSigningComponent },
    { path: 'zahlungsauftrag/processInstance/checkSignatures/processInstanceId/:processInstanceId/id/:id', component: CheckSignaturesComponent },
    { path: 'zahlungsauftrag/result/success', component: ShowResultComponent },
    { path: 'zahlungsauftrag/processInstance/error/processInstanceId/:processInstanceId/id/:id', component: ErrorComponent },

    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}