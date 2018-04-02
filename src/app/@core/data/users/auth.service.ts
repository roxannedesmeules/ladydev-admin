import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { UserService } from "./user.service";
import { BaseService } from "../base.service";
import { User } from "./user.model";
import { UserAuthForm } from "./auth.form";

@Injectable()
export class AuthService extends BaseService {
	public redirectUrl: string;
	public modelName = "auth";

	constructor (@Inject(HttpClient) http: HttpClient, private userService: UserService) {
		super(http);

		//  defines which model to use for mapping
		this.model = (construct: any) => new User(construct);
	}

	/**
	 *
	 * @param {UserAuthForm} body
	 * @return {Observable<User>}
	 */
	public login (body: UserAuthForm): Observable<User> {
		return this.create(body);
	}

	/**
	 *
	 * @return {Observable<any>}
	 */
	public logout (): Observable<any> {
		return this.http.delete(this._url())
				   .map(( res: any ) => {
					   this.userService.removeAppUser();

					   if (BaseService.SUCCESS_CODES.indexOf(res.status) >= 0) {
						   return this.mapListToModelList(res);
					   } else {
						   return this.mapError(res);
					   }
				   });
	}

	/**
	 * Set the "is_locked" value for the authenticated user to true.
	 */
	public lockSession (): Observable<any> {
		return this.http.delete(this._url())
				   .map(( res: any ) => {
					   const user = this.userService.getAppUser();
					   		 user.lockSession();

					   this.userService.saveAppUser(user);

					   if (BaseService.SUCCESS_CODES.indexOf(res.status) >= 0) {
						   return this.mapListToModelList(res);
					   } else {
						   return this.mapError(res);
					   }
				   });
	}

	/**
	 *
	 * @param {UserAuthForm} body
	 *
	 * @return {Observable<any>}
	 */
	public unlockSession (body: UserAuthForm): Observable<any> {
		return this.create(body)
				   .map(( res: any ) => {
					   if (BaseService.SUCCESS_CODES.indexOf(res.status) >= 0) {
						   return this.mapListToModelList(res);
					   } else {
						   return this.mapError(res);
					   }
				   });
	}

	/**
	 * Check if a user is logged in.
	 *
	 * @return {boolean}
	 */
	public isLoggedIn () {
		return (this.userService.getAppUser()) ? true : false;
	}

	/**
	 * Check is user is currently authenticated but in a lock session
	 *
	 * @return {boolean}
	 */
	public isLockedOut () {
		return this.userService.getAppUser().isSessionLock();
	}
}
