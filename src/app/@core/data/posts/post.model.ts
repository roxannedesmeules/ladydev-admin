import { PostLang } from "@core/data/posts/post-lang.model";

/**
 * @class Post
 */
export class Post {
	public id: number;
	public category_id: number;
	public post_status_id: number;
	public user_id: number;
	public username: string;
	public translations: PostLang[] = [];
	public readonly created_on: string;
	public readonly updated_on: string;

	constructor ( model: any = null ) {
		if (!model) { return; }

		this.id             = model.id;
		this.category_id    = model.category_id;
		this.post_status_id = model.post_status_id;
		this.user_id        = model.user_id;
		this.username       = model.username;

		this.created_on = model.created_on;
		this.updated_on = model.updated_on;

		this.translations = this.mapTranslations(model.translations);
	}

	/**
	 *
	 * @param {any[]} list
	 * @return {PostLang[]}
	 */
	mapTranslations ( list: any[] ): PostLang[] {
		list.forEach(( val, idx ) => {
			list[ idx ] = new PostLang(val);
		});

		return list;
	}

	/**
	 *
	 * @param {number | string} lang
	 *
	 * @return {CategoryLang}
	 */
	findTranslation ( lang: number | string ) {
		let result = new PostLang();

		if (!this.translations) {
			return result;
		}

		this.translations.forEach(( val ) => {
			if (typeof lang === "string" && val.language === lang) {
				result = val;
			}

			if (typeof lang === "number" && val.lang_id === lang) {
				result = val;
			}
		});

		return result;
	}

	firstTranslation (): PostLang {
		return this.translations[ 0 ];
	}

	/**
	 *
	 * @param model
	 */
	form ( model: any ): any {
		return {
			category_id    : model.category_id,
			post_status_id : model.post_status_id,
			translations   : this.mapFormTranslations(model.translations),
		};
	}

	/**
	 *
	 * @param list
	 * @return {PostLang[]}
	 */
	mapFormTranslations ( list: any ): PostLang[] {
		const result: PostLang[] = [];

		list.forEach(( val ) => {
			if (val.name || val.slug) {
				result.push(new PostLang(val, this.id));
			}
		});

		return result;
	}
}