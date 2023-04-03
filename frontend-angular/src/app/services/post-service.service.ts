import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostInterface } from '../interfaces/post.interface';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  constructor(private http: HttpClient) { }

  postPostagem(post: Object) {
    this.http.post('http://localhost:8080/api/postagem', post)
      .subscribe(data => console.log(data));
  }
}
