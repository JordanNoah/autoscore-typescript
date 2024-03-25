export class GradeItemDto {
    constructor(
        public id: number,
        public itemName: string,
        public itemType: string,
        public itemModule: string,
        public itemInstance: number,
        public itemNumber: number,
        public idNumber: string,
        public categoryId: number,
        public outcomeId: number|null,
        public scaleId: number|null,
        public locked: boolean,
        public cmId: number,
        public gradeRaw: number|null,
        public gradeDateSubmitted: number|null,
        public gradeDateGraded: number|null,
        public gradeHiddenByDate: boolean,
        public gradeNeedsUpdate: boolean,
        public gradeIsHidden: boolean,
        public gradeIsLocked: boolean,
        public gradeIsOverridden: boolean,
        public gradeFormatted: string,
        public gradeMin: number,
        public gradeMax: number,
        public rangeFormatted: string,
        public percentageFormatted: string,
        public feedback: string,
        public feedbackFormat: number
    ) {}

    static create(object:{[key:string]:any}):[string?,GradeItemDto?]{
        const {
            id,
            itemname,
            itemtype,
            itemmodule,
            iteminstance,
            itemnumber,
            idnumber,
            categoryid,
            outcomeid,
            scaleid,
            locked,
            cmid,
            graderaw,
            gradedatesubmitted,
            gradedategraded,
            gradehiddenbydate,
            gradeneedsupdate,
            gradeishidden,
            gradeislocked,
            gradeisoverridden,
            gradeformatted,
            grademin,
            grademax,
            rangeformatted,
            percentageformatted,
            feedback,
            feedbackformat
        } = object
        return [
            undefined,
            new GradeItemDto(
                id,
                itemname,
                itemtype,
                itemmodule,
                iteminstance,
                itemnumber,
                idnumber,
                categoryid,
                outcomeid,
                scaleid,
                locked,
                cmid,
                graderaw,
                gradedatesubmitted,
                gradedategraded,
                gradehiddenbydate,
                gradeneedsupdate,
                gradeishidden,
                gradeislocked,
                gradeisoverridden,
                gradeformatted,
                grademin,
                grademax,
                rangeformatted,
                percentageformatted,
                feedback,
                feedbackformat
            )
        ]
    }
}