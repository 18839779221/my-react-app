export interface BannerResModel {
    banners: BannerModel[],
    code: number
}

export interface BannerModel {
    imageUrl: string,
    targetId: number,
    titleColor: string,
    typeTitle: string,
}

export interface HotRecommendResModel {
    hasTaste: boolean,
    code: number,
    categroy: number,
    result: HotRecommendModel[]
}

export interface HotRecommendModel {
    id: number,
    type?: number,
    name: string,
    copywriter?: string,
    picUrl: string,
    canDislike: string,
    trackNumberUpdateTime: number,
    playCount: number,
    trackCount: number,
    highQuality: boolean,
    alg?: string
}

export interface ArtistResModel {
    artists: ArtistModel[],
    more: boolean,
    code: number
}

export interface ArtistModel {
    id: number,
    name: string,
    albumSize: number,
    alias?: string[],
    briefDesc?: string,
    followed: boolean,
    img1v1Id?: number,
    img1v1Id_str?: string,
    img1v1Url?: string,
    musicSize: number,
    picId: number,
    picId_str: string,
    picUrl: string,
    topicPerson?: number,
    trans?: string
}

export interface NewestAlbumModel {
    albums: AlbumModel[],
    code: number,
}

export interface AlbumModel {
    id: number,
    name: string,
    type: string,
    size: number,
    picId: number,
    picId_str: string,
    pic: number,
    picUrl: string,
    blurPicUrl: string,
    publishTime: number,
    description: string,
    tags: string,
    company: string,
    briefDesc: string,
    artist: ArtistModel,
    artists: ArtistModel[],
    songs?: string,
    alias?: string[],
    status: 1,
    copywriteId: number,
    paid: boolean,
    onSale: boolean,
}

