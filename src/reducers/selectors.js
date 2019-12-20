export const selectHasClickedCreate = (state) => state.hasClickedCreate;
export const selectUser = (state) => state.user;
export const selectTimeRangeName = (state) => state.timeRangeName;
export const selectGenreCount = (state) => state.genreCount;
export const selectArtistCount = (state) => state.artistCount;
export const selectTrackCount = (state) => state.trackCount;
export const selectStatsOptions = (state) => state.statsOptions;
export const selectDisplayProfile = (state) => state.displayProfile;
export const selectDisplayMap = (state) => state.displayMap;
export const selectOptimizeTracks = (state) => state.optimizeTracks;
export const selectArtists = (state) => state.artists;
export const selectArtistsByCurrentTimeRange = (state) => state
  .artistsByTimeRangeName[state.timeRangeName];
export const selectTracks = (state) => state.tracks;
export const selectTracksByCurrentTimeRange = (state) => state
  .tracksByTimeRangeName[state.timeRangeName];
export const selectFeatures = (state) => state.features;
export const selectFeaturesByCurrentTimeRange = (state) => state
  .featuresByTimeRangeName[state.timeRangeName];
export const selectArtistCountries = (state) => state.artistCountries;
export const selectArtistCountriesByCurrentTimeRange = (state) => state
  .artistCountriesByTimeRangeName[state.timeRangeName];
export const selectArtistReleases = (state) => state.artistReleases;
export const selectArtistReleasesByCurrentTimeRange = (state) => state
  .artistReleasesByTimeRangeName[state.timeRangeName];
