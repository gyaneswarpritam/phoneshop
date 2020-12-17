import { CommonService } from './../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  phones: any = [];
  closeResult = '';
  productForm: FormGroup;
  edit: boolean = false;
  phoneId: string = '';
  content: any;
  filterargs = '';

  constructor(
    private commonService: CommonService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: [''],
      brandName: [''],
      baterySize: [''],
      screenSize: [''],
      colors: [''],
    });
    this.getProducts();
  }

  getProducts() {
    this.commonService.getData('phone').subscribe((data) => {
      this.phones = data;
    });
  }

  submitProduct() {
    if (this.productForm.valid) {
      console.log(this.productForm.value, 'this.productForm.value');
      if (this.edit) {
        this.commonService
          .putData(`phone/${this.phoneId}`, this.productForm.value)
          .subscribe((data) => {
            console.log(data, 'response after add');
            this.getProducts();
            this.productForm.reset();
            this.toastr.success('New Record Added Successfully', 'Added');
            this.modalService.dismissAll();
          });
      } else {
        this.commonService
          .postData('phone', this.productForm.value)
          .subscribe((data) => {
            console.log(data, 'response after add');
            this.getProducts();
            this.productForm.reset();
            this.toastr.success('Record Updated Successfully', 'Updated');
            this.modalService.dismissAll();
          });
      }
    }
  }

  open(content, data?) {
    if (data) {
      this.edit = true;
      this.phoneId = data;
      this.commonService.getData(`phone/${data}`).subscribe((data: any) => {
        this.productForm.patchValue({
          name: data.name,
          brandName: data.brandName,
          baterySize: data.baterySize,
          screenSize: data.screenSize,
          colors: data.colors,
        });
      });
    } else {
      this.edit = false;
      this.phoneId = '';
    }
    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  delete(id) {
    if (confirm('Are you sure to delete ')) {
      this.commonService.deleteData(`phone/${id}`).subscribe((data: any) => {
        if (data) {
          this.toastr.success('Record Deleted Successfully', 'Deleted');
          this.getProducts();
        }
      });
    }
  }

  searchThis(data) {
    if (data) {
      console.log(this.phones, 'check phones', data);
      this.phones = _.filter(this.phones, function (o: any) {
        return o.name.includes(data) || o.name == data;
      });
    } else {
      this.getProducts();
    }

    // this.content = this.phones;
    // console.log(data);
    // if (data) {
    //   this.phones = this.phones.filter(function (ele, i, array) {
    //     let arrayelement = ele.name.toLowerCase();
    //     return arrayelement.includes(data);
    //   });
    // } else {
    //   this.phones = this.content;
    //   console.log(this.phones);
    // }
    // console.log(this.phones);
  }
}
