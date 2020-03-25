import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;
  errorMsg = null;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(post: Post) {
    // Send Http POST request
    this.postService.createPost(post).subscribe(responseData => {
      console.log('POST response: ', responseData);
      this.fetchPosts();
    });
  }

  onFetchPosts() {
    // Send Http GET request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http DELETE request
    this.postService.deletePosts().subscribe(response => {
      console.log('DELETE response: ', response);
      this.loadedPosts = [];
    });
  }

  private fetchPosts() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(posts => {
      this.loadedPosts = posts;
      this.isLoading = false;
    }, this.errorHandler.bind(this));
  }

  private errorHandler(error: Error) {
    this.errorMsg = error.message;
    this.isLoading = false;
  }
}
