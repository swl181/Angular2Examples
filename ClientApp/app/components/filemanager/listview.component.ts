import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITreeNode } from './filemanager.model'

@Component({
    selector: 'listview',
    templateUrl: './listview.component.html',
})
export class ListViewComponent {

    @Input() nodes: Array<ITreeNode>;
}
