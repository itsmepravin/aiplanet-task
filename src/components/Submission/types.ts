export namespace Types {
  export type Submission = {
    id: number | string;
    title: string;
    summary: string;
    description: string;
    favorite: boolean;
    coverImgName: string;
    coverImg: string | ArrayBuffer;
    hackathonName: string;
    startDate: string;
    endDate: string;
    githubLink: string;
    googleLink: string;
  };
}
