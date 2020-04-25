import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() show = false;
  @Input() display = false;
  @Input() backDropModifier: string;
  @Input() modalModifier: string;
  @Input() closeBtnModifier: string;
  @Output() closeEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  closeModal() {
    this.show = false;
    this.closeEvent.emit();

    setTimeout(() => {
      this.display = false;
    }, 500);
  }

  openModal() {
    this.display = true;

    setTimeout(() => {
      this.show = true;
    }, 100);
  }
}
