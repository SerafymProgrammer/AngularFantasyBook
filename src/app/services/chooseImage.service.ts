import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AddBookImgService } from './add-book-Img.service';


@Injectable()
export class ChooseImageService {


  constructor(private addBookImgService: AddBookImgService) {}

  message: string;
  imagePath: any;
  imgURL: string | ArrayBuffer;

  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      this.addBookImgService.triggerEvent(this.imgURL);
    };

  }

}
