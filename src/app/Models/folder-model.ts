import { BaseFileModel } from './base-file-model';
import { FileModel } from './file-model';

export class FolderModel extends BaseFileModel {
    Subfiles: Array<FileModel>;
    Subfolders: Array<FolderModel>;
}
