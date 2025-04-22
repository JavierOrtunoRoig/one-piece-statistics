type TimeOptions = {
  type: 'long' | 'short';
};

export const sumDuration = (episodes: Episode[]) =>
  episodes.reduce((acc, ep) => acc + ep.duration, 0);

export const getTime = (
  duration: number,
  { type }: TimeOptions = { type: 'long' },
) => {
  const seconds = Math.trunc(duration % 60);
  let minutes = Math.trunc(duration / 60);
  const hours = Math.trunc(minutes / 60);

  if (hours > 0) {
    minutes = Math.trunc(minutes % 60);
  }

  if (type === 'long') {
    return `${
      hours > 0 ? `${hours} hours, ` : ''
    }${minutes} minutes and ${seconds} seconds`;
  } else {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
};

export function flattenVideosObject(videos: Serie): Episode[] {
  return Object.values(videos).flatMap((saga) =>
    Object.values(saga).flatMap((arc) => arc),
  );
}

export const getArcTime = (arc: Episode[]) => {
  if (!arc) return;
  const totalArcDuration = Object.values(arc)
    .map((episode) => episode.duration)
    .reduce((acc, curr) => acc + curr, 0);
  return getTime(totalArcDuration);
};

export const getArcWatchedTime = (arc: Episode[]) => {
  const watched = Object.values(arc).filter((ep) => ep.watched);
  return getTime(sumDuration(watched));
};

export const getArcRemainingTime = (arc: Episode[]) => {
  const remaining = Object.values(arc).filter((ep) => !ep.watched);
  return getTime(sumDuration(remaining));
};

export const getArcTotalTime = (arc: Episode[]) => sumDuration(arc);

export const getSagaTotalTime = (saga: Arc) =>
  Object.values(saga).reduce(
    (sagaSum, arc) => sagaSum + getArcTotalTime(arc),
    0,
  );

export const getSerieTotalTime = (videos: Serie): number =>
  Object.values(videos).reduce(
    (total, saga) => total + getSagaTotalTime(saga),
    0,
  );

export const getAllSagasChartInformation = (
  videos: Serie,
): { label: string; duration: number }[] => {
  return Object.entries(videos).map(([sagaName, arcs]) => {
    const sagaTotalTime = getSagaTotalTime(arcs);
    return { label: sagaName, duration: sagaTotalTime };
  });
};

export const getAllArcsChartInformation = (
  serie: Serie,
  arcName: string,
): { label: string; duration: number }[] => {
  return Object.entries(serie[arcName]).map(([arc, episodes]) => {
    const arcTotalTime = getArcTotalTime(episodes);
    return { label: arc, duration: arcTotalTime };
  });
};
