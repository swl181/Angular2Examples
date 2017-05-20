import { Component, OnInit } from '@angular/core';

import { ITreeNode } from './filemanager.model'
import { FilesLoaderService } from './fileloader.service'

@Component({
    selector: 'filemanager',
    templateUrl: './filemanager.component.html'
})
export class FilemanagerComponent implements OnInit {

    treenode: Array<ITreeNode>;
    listnode: Array<ITreeNode>;

    constructor(private filesLoaderService: FilesLoaderService) {
    }

    ngOnInit() {
        this.refreshContent();
    }

    refreshContent() {
        this.filesLoaderService.load().subscribe(entity => {
            this.treenode = entity;            
        });
    }

    onRequestNodes(event: ITreeNode)
    {
        this.filesLoaderService.load().subscribe(entity => {
            event.children = entity;
            this.listnode = entity;
        });
    }

    onSelectNode(event: ITreeNode) {
        console.dir(event);
        this.listnode = event.children;
    }
}
