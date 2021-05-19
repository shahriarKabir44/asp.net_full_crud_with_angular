import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component'
import { Title } from '@angular/platform-browser';
import { ModalComponent } from './modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [LoaderComponent, ModalComponent, HeaderComponent],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
    ],
    exports: [
        LoaderComponent,
        ModalComponent
    ],
    providers: [Title]
})
export class GlobalModule { }
