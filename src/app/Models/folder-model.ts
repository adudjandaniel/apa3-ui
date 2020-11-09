import { BaseFileModel } from './base-file-model';
import { FileModel } from './file-model';

export class FolderModel extends BaseFileModel {
    subfiles: Array<FileModel>;
    subfolders: Array<FolderModel>;
}
