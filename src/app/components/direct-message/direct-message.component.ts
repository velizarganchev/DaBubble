import { Component } from '@angular/core';

import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileCardComponent } from '../../user-profile-card/user-profile-card.component';

@Component({
  selector: 'app-direct-message',
  standalone: true,
  templateUrl: './direct-message.component.html',
  styleUrl: './direct-message.component.scss',
  imports: [CommonModule, MessageBoxComponent, PickerComponent],
})
export class DirectMessageComponent {
  constructor(private dialog: MatDialog) {}

  online = true;
  emojiPicker = false;

  openUserProfile(): void {
    this.dialog.open(UserProfileCardComponent);
  }
}
