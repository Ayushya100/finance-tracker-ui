import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { I18nService } from 'src/app/modules/shared/services/i18n.service';
import { PopupService } from 'src/app/modules/shared/services/popup.service';

// Util
import { UserDetailsFormUtils } from '../../utils';
import { RegexPatterns } from 'src/app/modules/shared/modules/pattern-validators';
import { UserStore } from 'src/app/modules/user/stores/user.store';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userPrefix: string = 'userSection.userProfile.component.';
  messagePrefix: string = 'userSection.userProfile.message.';
  userAuthScopes: any;

  userBioForm: FormGroup;
  userBioField: any;
  userBioActions: any;

  userForm: FormGroup;
  userFields: any;
  userFieldActions: any;
  userFormTitle: string = '';

  userPasswordForm: FormGroup;
  userPasswordFields: any;
  userPasswordActions: any;
  userPasswordTitle: string = '';

  userDeactivationForm: FormGroup;
  userDeactivationFields: any;
  userDeactivationTitle: string = '';
  userDeactivationMsg: string = '';

  userInfo: any;

  userImgFields: any;
  userImgActions: any;
  userImg: string = '';
  previewImg: string = '';
  isUserImgAvailable: boolean = true;
  showDeleteIcon: boolean = false;
  fileName: string = '';
  selectedFile: any;

  preview: string = '';
  imageHeader: string = '';
  imageHeaderSpan: number = 1;
  updateBtnHeader: string = '';

  deleteAccHeader: string = '';
  deleteAccInfo: string = '';
  deleteBtnHeader: string = '';
  proceedMsg: string = '';
  confirmUpload: string = '';
  cancelUpload: string = '';

  viewPermission: boolean = false;
  editPermission: boolean = false;
  deletePermission: boolean = false;

  constructor(
    private userDetailsFormUtils: UserDetailsFormUtils,
    private i18n: I18nService,
    private popupService: PopupService,
    private store: UserStore,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {
    this.userBioForm = this.fb.group({
      bio: ['', Validators.required]
    });

    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      userName: ['', [Validators.required, Validators.pattern(RegexPatterns.userName)]],
      emailId: ['', Validators.required],
      gender: [''],
      dob: [''],
      contactNumber: ['', Validators.pattern(RegexPatterns.mobile)]
    });

    this.userPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(RegexPatterns.password)]]
    });

    this.userDeactivationForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    this.userFormTitle = await this.i18n.translate(`${this.userPrefix}Basic Info`);
    this.userPasswordTitle = await this.i18n.translate(`${this.userPrefix}Change Password`);
    this.imageHeader = await this.i18n.translate(`${this.userPrefix}Upload delete profile image`);
    this.updateBtnHeader = await this.i18n.translate(`${this.userPrefix}update`);
    this.deleteAccHeader = await this.i18n.translate(`${this.userPrefix}Delete Account`);
    this.deleteAccInfo = await this.i18n.translate(`${this.messagePrefix}Delete Account details`);
    this.proceedMsg = await this.i18n.translate(`${this.messagePrefix}Are you sure you want to proceed`);
    this.deleteBtnHeader = await this.i18n.translate(`${this.userPrefix}Delete`);
    this.preview = await this.i18n.translate(`${this.messagePrefix}Preview`);
    this.confirmUpload = await this.i18n.translate(`${this.messagePrefix}Confirm Upload`);
    this.cancelUpload = await this.i18n.translate(`${this.messagePrefix}Cancel Upload`);
    this.userDeactivationTitle = await this.i18n.translate(`${this.userPrefix}Confirm Deletion`);
    this.userDeactivationMsg = await this.i18n.translate(`${this.messagePrefix}Confirm your account deletion request`);

    this.userBioField = await this.userDetailsFormUtils.getUserBioFormMetadata();
    this.userFields = await this.userDetailsFormUtils.getUserDetailsMetadata();
    this.userPasswordFields = await this.userDetailsFormUtils.getUserPasswordMetadata();
    this.userImgFields = await this.userDetailsFormUtils.getUserImageMetadata();
    this.userDeactivationFields = await this.userDetailsFormUtils.getUserDeactivationMetadata();

    this.store.getStateSubject().subscribe((data) => {
      this.userAuthScopes = data.userPermissions;
      this.loadUserInfo(data);
      this.checkPermissions(this.userAuthScopes);
    });
  }

  checkPermissions(permissions: any) {
    if (permissions.editPermission) {
      this.userFields.fields.filter((item: any) => item.type !== 'email').forEach((item: any) => {
        item.readonly = false;
      });
      this.userBioField.fields.forEach((item: any) => {
        item.readonly = false;
      });
      this.userPasswordFields.fields.forEach((item: any) => {
        item.readonly = false;
      });
    }

    this.userFieldActions = permissions.editPermission ? this.userFields.actions : null;
    this.userBioActions = permissions.editPermission ? this.userBioField.actions : null;
    this.userPasswordActions = permissions.editPermission ? this.userPasswordFields.actions : null;
    this.userImgActions = permissions.editPermission ? this.userImgFields.actions : null;
    this.imageHeaderSpan = permissions.editPermission ? 1 : 2;

    this.userImgActions = permissions.deletePermission && this.isUserImgAvailable ? this.userImgActions : this.userImgFields.actions.filter((item: any) => item.type !== 'delete');

    this.viewPermission = permissions.viewPermission;
    this.editPermission = permissions.editPermission;
    this.deletePermission = permissions.deletePermission;
    this.cdRef.detectChanges();
  }
  
  loadUserInfo(userRecord: any) {
    this.userInfo = {
      firstName: userRecord.firstName,
      lastName: userRecord.lastName,
      userName: userRecord.userName,
      emailId: userRecord.emailId,
      gender: userRecord.gender,
      dob: userRecord.dob,
      contactNumber: userRecord.contactNumber
    };
    this.userImg = userRecord.profileImageURL ? userRecord.profileImageURL : 'assets/img/dummy-user.png';
    this.previewImg = this.userImg;
    this.isUserImgAvailable = userRecord.profileImageURL ? true : false;
    this.loadBioFormData(userRecord.bio);
    this.cdRef.detectChanges();
  }

  loadBioFormData(bio: string) {
    this.userBioForm.patchValue({
      bio: bio
    });
  }

  onUserBioSubmit() {
    if (this.editPermission) {
      this.store.updateUserInfo(this.userBioForm.value);
    }
  }

  onUserInfoSubmit($event: any) {
    if (this.editPermission) {
      this.store.updateUserInfo($event);
    }
  }

  onUserPasswordSubmit($event: any) {
    if (this.editPermission) {
      this.store.updateUserPassword($event);
    }
  }

  triggerImgAction(action: any) {
    if (action.type === 'delete') {
      this.store.deleteUserImage();
    } 
    
    if (action.type === 'submit') {
      const fileInput = document.getElementById('imageInput') as HTMLInputElement;
      fileInput.click();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.fileName = file.name;
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImg = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', this.selectedFile);
      this.store.updateUserImage(formData);
      this.fileName = '';
    }
  }

  cancelImageUpload() {
    this.previewImg = this.userImg;
    this.fileName = '';
  }

  openDeleteForm() {
    const input = {
      title: this.userDeactivationTitle,
      actions: this.userDeactivationFields.actions,
      form: this.userDeactivationForm,
      formDetails: this.userDeactivationFields.fields,
      message: this.userDeactivationMsg
    };

    this.popupService.openFormPopup(input).then(res => {
      if (res) {
        this.store.deactivateUserAccount(res);
      }
    });
  }

}
