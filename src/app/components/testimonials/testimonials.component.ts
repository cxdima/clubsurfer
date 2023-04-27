import { Component, HostListener } from '@angular/core';
import { Testimonial } from './testimonials.model';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent {

  testimonials: Testimonial[] = [
    {
      name: 'Anna Rodriguez',
      image: 'https://i.pravatar.cc/150?img=28',
      rating: 5,
      message: 'ClubSurfer is a lifesaver for me in terms of finding new clubs and organizations to join. The app is user-friendly and makes it easy to connect with like-minded people and discover new opportunities.'
    },
    {
      name: 'Michael Nguyen',
      image: 'https://i.pravatar.cc/150?img=8',
      rating: 5,
      message: 'I found my dream job thanks to ClubSurfer. The app made it easy to search for jobs and connect with potential employers. I highly recommend this app to anyone looking to advance their career.'
    },
    {
      name: 'Emily Brown',
      image: 'https://i.pravatar.cc/150?img=16',
      rating: 5,
      message: 'I have been able to make so many new friends through ClubSurfer. The app is a great way to meet new people and join clubs and communities that align with your interests and passions.'
    },
    {
      name: 'David Lee',
      image: 'https://i.pravatar.cc/150?img=67',
      rating: 5,
      message: 'ClubSurfer has made it easy for me to find volunteer opportunities in my community. The app has a wide range of options to choose from and has helped me give back to causes that are important to me.'
    },
    {
      name: 'Julia Hernandez',
      image: 'https://i.pravatar.cc/150?img=20',
      rating: 5,
      message: 'I love how easy it is to navigate ClubSurfer and find exactly what I\'m looking for. The app has helped me discover new hobbies and passions that I never would have thought of before.'
    },
    {
      name: 'Mark Johnson',
      image: 'https://i.pravatar.cc/150?img=51',
      rating: 5,
      message: 'ClubSurfer is an amazing app that has something for everyone. Whether you\'re looking for a new job, volunteer opportunity, or club to join, you\'re sure to find it on this app. I highly recommend it!'
    }
  ];

  displayedTestimonials: Testimonial[] = [];
  currentIndex: number = 0;

  constructor() {
    this.displayedTestimonials = this.getTestimonialsToDisplay(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.displayedTestimonials = this.getTestimonialsToDisplay(event.target.innerWidth);
  }

  moveToNext() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.displayedTestimonials = this.getTestimonialsToDisplay(window.innerWidth);
  }

  moveToPrevious() {
    this.currentIndex = (this.currentIndex + this.testimonials.length - 1) % this.testimonials.length;
    this.displayedTestimonials = this.getTestimonialsToDisplay(window.innerWidth);
  }

  getTestimonialsToDisplay(width: number): Testimonial[] {
    let displayCount = 3;
    if (width <= 768) {
      displayCount = 1;
    }
    const displayIndices = [(this.currentIndex + this.testimonials.length - 1) % this.testimonials.length, this.currentIndex, (this.currentIndex + 1) % this.testimonials.length];
    return displayIndices.map(index => this.testimonials[index]).slice(0, displayCount);
  }

}
