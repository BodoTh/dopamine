import { Injectable } from '@angular/core';
import { FileMetadata } from '../../metadata/file-metadata';
import { EmbeddedAlbumArtworkGetter } from './embedded-album-artwork-getter';
import { ExternalAlbumArtworkGetter } from './external-album-artwork-getter';
import { OnlineAlbumArtworkGetter } from './online-album-artwork-getter';

@Injectable()
export class AlbumArtworkGetter {
    constructor(
        private embeddedAlbumArtworkGetter: EmbeddedAlbumArtworkGetter,
        private externalAlbumArtworkGetter: ExternalAlbumArtworkGetter,
        private onlineAlbumArtworkGetter: OnlineAlbumArtworkGetter) {
    }

    public async getAlbumArtworkAsync(fileMetadata: FileMetadata): Promise<Buffer> {
        if (fileMetadata == undefined) {
            return undefined;
        }

        const embeddedArtwork: Buffer = this.embeddedAlbumArtworkGetter.getEmbeddedArtwork(fileMetadata);

        if (embeddedArtwork != undefined) {
            return embeddedArtwork;
        }

        const externalArtwork: Buffer = await this.externalAlbumArtworkGetter.getExternalArtworkAsync(fileMetadata);

        if (externalArtwork != undefined) {
            return externalArtwork;
        }

        const onlineArtwork: Buffer = await this.onlineAlbumArtworkGetter.getOnlineArtworkAsync(fileMetadata);

        if (onlineArtwork != undefined) {
            return onlineArtwork;
        }

        return undefined;
    }
}
