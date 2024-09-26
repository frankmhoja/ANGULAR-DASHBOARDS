import { Component } from '@angular/core';

@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html'
})
export class AddDetailsComponent {
  showModal: boolean = false;

  // Method to open the modal
  openModal() {
    this.showModal = true;
  }

  // Method to close the modal
  closeModal() {
    this.showModal = false;
  }

  // Handle form submission
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted', form.value);
      // Form submission logic here
      this.closeModal(); // Close modal after submission
    }
  }

  

  // Dropdown options actions
  view() {
    console.log('View action triggered');
  }

  activate() {
    console.log('Activate action triggered');
  }

  deactivate() {
    console.log('Deactivate action triggered');
  }

  suspend() {
    console.log('Suspend action triggered');
  }

  download() {
    console.log('Download action triggered');
  }
}
