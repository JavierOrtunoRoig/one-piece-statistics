interface Episode {
  title: string;
  duration: number;
  watched: boolean;
}

// type Arc = Episode[];

interface Arc {
  [arc: string]: Episode[];
}

interface Serie {
  [saga: string]: Arc;
}
