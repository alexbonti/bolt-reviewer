export interface Paper {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  pdfUrl: string;
  status: 'new' | 'reviewed';
  notes: Note[];
  aiReview?: string;
  uploadDate: string;
}

export interface Note {
  id: string;
  content: string;
  timestamp: string;
}
