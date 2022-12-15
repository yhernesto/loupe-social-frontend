/**
 * Relation Interfaces
 */
export interface IRelationLogs {
	hashtag: string,
	occurrences: number
}

export interface IReqRelationRatio {
	max: number,	// max value of occurrences
	min: number,	// min value of occurrences
	relation_logs: Array<IRelationLogs>
}

/**
 * Relation Interfaces
 */

export interface IResRelationRating {
	hashtag: string,
	occurrences: number
}

export interface IResLastRelationRation extends IResRelationRating {
  takenAt: Date
}

export interface IResLatestHashtagPosts {
  shortcode: string,
  is_top: boolean,
  text: string,
  score: number ,
  magnitude: number,
  likes: number,
  comments: number,
  score_pct: number,
  magnitude_pct: number,
  takenAt: Date,
}