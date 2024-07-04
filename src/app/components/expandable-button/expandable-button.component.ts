import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { AddChannelComponent } from '../../add-channel/add-channel.component';
import { Channel } from '../../../models/channel.class';

@Component({
  selector: 'app-expandable-button',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  templateUrl: './expandable-button.component.html',
  styleUrl: './expandable-button.component.scss',
})
export class ExpandableButtonComponent {
  isMenuExpanded = true;
  title = input.required<string>();
  icon = input.required<string>();
  showBtn = input.required<boolean>();
  online = true;
  @Input() user_id: string = '';
  @Input() userChannels: Channel[] = [];

  constructor(
    private dialog: MatDialog,
  ) { }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  onAddChannelClick(): void {
    const dialogRef = this.dialog.open(AddChannelComponent);
    dialogRef.componentInstance.channel.author_uid = this.user_id;
    dialogRef.componentInstance.channel.members_uids.push(this.user_id);
  }
}
