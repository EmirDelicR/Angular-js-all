import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { DownloadDocument } from 'src/app/interfaces/download.module';

@Component({
  selector: 'app-multi-tile',
  templateUrl: './multi-tile.component.html',
  styleUrls: ['./multi-tile.component.scss'],
})
export class MultiTileComponent implements OnInit, OnDestroy {
  @Input() document: DownloadDocument;
  @Output() setFile = new EventEmitter<DownloadDocument>();
  constructor() {}

  ngOnInit(): void {}

  toggleState(elem: HTMLInputElement) {
    const $root = elem.closest('.multi-tile');
    this.unCheckElement();
    $root.classList.add('checked');

    this.setFile.emit(this.document);
  }

  unCheckElement() {
    const $checked = document.getElementsByClassName('checked')[0];

    if ($checked) {
      $checked.classList.remove('checked');
    }
  }

  ngOnDestroy() {
    this.unCheckElement();
    this.setFile.emit(null);
  }
}
