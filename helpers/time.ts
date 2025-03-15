import { flatMapDeep } from "lodash-es";

type TimeOptions = {
  type: "long" | "short";
};

export const getTime = (
  duration: number,
  { type }: TimeOptions = { type: "long" },
) => {
  const seconds = Math.trunc(duration % 60);
  let minutes = Math.trunc(duration / 60);
  const hours = Math.trunc(minutes / 60);

  if (hours > 0) {
    minutes = Math.trunc(minutes % 60);
  }

  if (type === "long") {
    return `${
      hours > 0 ? `${hours} hours, ` : ""
    }${minutes} minutes and ${seconds} seconds`;
  } else {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
};

export function flattenVideosObject<T>(
  videos: Record<string, Record<string, T>>,
): T[] {
  return flatMapDeep(videos, (season) =>
    flatMapDeep(season, (episodes) => episodes),
  );
}

export const getArcTime = (arc: object) => {
  if (!arc) return;
  const totalArcDuration = Object.values(arc)
    .map((episode) => episode.duration)
    .reduce((acc, curr) => acc + curr, 0);
  return getTime(totalArcDuration);
};

export const getArcWatchedTime = (arc: object) => {
  const totalArcDuration = Object.values(arc)
    .filter((episode) => episode.watched)
    .map((episode) => episode.duration)
    .reduce((acc, curr) => acc + curr, 0);
  return getTime(totalArcDuration);
};

export const getArcRemainingTime = (arc: object) => {
  const totalArcDuration = Object.values(arc)
    .filter((episode) => !episode.watched)
    .map((episode) => episode.duration)
    .reduce((acc, curr) => acc + curr, 0);
  return getTime(totalArcDuration);
};

export const getArcTotalTime = (arc: Episode[]) =>
  arc.reduce((arcSum, episodes) => arcSum + episodes.duration, 0);

export const getSagaTotalTime = (saga: Serie) =>
  Object.values(saga).reduce(
    (sagaSum, arc) => sagaSum + getArcTotalTime(arc),
    0,
  );

export const getSerieTotalTime = (videos: Serie): number =>
  Object.values(videos).reduce(
    (total, saga) => total + getSagaTotalTime(saga),
    0,
  );
