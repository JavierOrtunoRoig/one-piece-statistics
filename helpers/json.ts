type MergeJsons = (latest: Serie, existing: Serie) => Serie;

export const mergeJsons: MergeJsons = (latest, existing) => {
  const merged: Serie = { ...existing };

  for (const saga in latest) {
    if (!merged[saga]) merged[saga] = {};

    for (const arc in latest[saga]) {
      if (!merged[saga][arc]) {
        merged[saga][arc] = latest[saga][arc];
        continue;
      }

      const existingEpisodes = merged[saga][arc];
      const latestEpisodes = latest[saga][arc];

      const episodeMap = new Map<string, Episode>();
      existingEpisodes.forEach((ep) => episodeMap.set(ep.title, ep));

      latestEpisodes.forEach((ep) => {
        if (!episodeMap.has(ep.title)) {
          episodeMap.set(ep.title, ep);
        }
      });

      merged[saga][arc] = Array.from(episodeMap.values());
    }
  }

  return merged;
};
