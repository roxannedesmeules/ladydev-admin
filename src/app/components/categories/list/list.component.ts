import { Component, OnInit } from "@angular/core";
import { BreadcrumbItems } from "core/layout/breadcrumb/breadcrumb-items.model";
import { PageHeaderService } from "core/layout/page-header/page-header.service";

@Component({
	selector    : "app-categories-list",
	templateUrl : "./list.component.html",
	styleUrls   : [ "./list.component.scss" ],
})
export class ListComponent implements OnInit {

	header = {
		title      : "Categories",
		subTitle   : "List of categories",
		breadcrumb : [
			new BreadcrumbItems({ name : "Dashboard" }),
			new BreadcrumbItems({ name : "Categories", isActive : true }),
		],
	};

	constructor (private headerService: PageHeaderService) { }

	ngOnInit () {
		this.headerService.setPageHeader(this.header);
	}

}