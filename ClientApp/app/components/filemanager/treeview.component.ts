import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ITreeNode } from './filemanager.model'

@Component({
    selector: 'treeview',
    templateUrl: './treeview.component.html',
    styles: [
        '.treenodes {display:table; list-style-type: none;  padding-left: 16px;}',
        ':host .treenodes { padding-left: 0; }',
        '.treenode { display: table-row; list-style-type: none; }',
        '.nodebutton { display:table-cell; cursor: pointer; }',
        '.nodeinfo { display:table-cell; padding-left: 5px; list-style-type: none; }',
        '.nodetext { color: #31708f; padding-left: 3px; padding-right: 3px; cursor: pointer; }',
        '.nodetext.bg-info { font-weight: bold; }',
    ]
})
export class TreeViewComponent {
    @Input() treenodes: Array<ITreeNode>;
    @Input() selectedNode: ITreeNode;

    @Output() onRequestNodes: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();
    @Output() onSelectNode: EventEmitter<ITreeNode> = new EventEmitter<ITreeNode>();

    onExpand(node: ITreeNode): void {
        node.isExpanded = node.isExpanded ? false : true;

        if (node.isExpanded && (!node.children || node.children.length === 0)) {
            this.onRequestNodes.emit(node);
        }

    }

    getFolders(node: ITreeNode) {
        return !node.isLeaf;
    }

    onSelectNodeLocal(node: ITreeNode) {
        this.selectedNode = node;
        this.onSelectNode.emit(node);
    }

    onRequestLocal(node: ITreeNode) {
        this.onRequestNodes.emit(node);
        this.onSelectNodeLocal(node);
    }
}
