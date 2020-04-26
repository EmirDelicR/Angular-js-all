export interface DownloadFile {
  src: string;
  ext: string;
  color?: string;
}

export interface DownloadDocument {
  title: string;
  file: DownloadFile;
  date: string;
  lang: string;
  favorite?: boolean;
}

export interface DownloadData {
  title: string;
  type: string;
  date: string;
  lang: string;
  file: DownloadFile;
  favorite: boolean;
  subHeadlineInfo: string;
  subHeadlineLang: string;
  documents: DownloadDocument[];
}
