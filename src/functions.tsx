export const getScore = (data: any, ratingValues: any[]) => {
  const sum =
    Number(ratingValues[data?.cirost]) +
    Number(ratingValues[data?.farba]) +
    Number(ratingValues[data?.intenzita]) +
    Number(ratingValues[data?.cistota]) +
    Number(ratingValues[data?.harmonia]) +
    Number(ratingValues[data?.intenzitaChut]) +
    Number(ratingValues[data?.cistotaChut]) +
    Number(ratingValues[data?.harmoniaChut]) +
    Number(ratingValues[data?.perzistencia]);

  return Math.floor(sum / 9);
};

export const getScoreCustom = (data: any, ratingValues: any[]) => {
  const values = [
    Number(ratingValues[data?.cirost]),
    Number(ratingValues[data?.farba]),
    Number(ratingValues[data?.intenzita]),
    Number(ratingValues[data?.cistota]),
    Number(ratingValues[data?.harmonia]),
    Number(ratingValues[data?.intenzitaChut]),
    Number(ratingValues[data?.cistotaChut]),
    Number(ratingValues[data?.harmoniaChut]),
    Number(ratingValues[data?.perzistencia]),
  ];

  values.sort((a, b) => a - b).pop();
  values.shift();

  return Math.floor(
    values.reduce((prev, curr) => prev + curr, 0) / values.length
  );
};

export const getScoreUnited = (data: any[]) =>
  Math.floor(data.reduce((prev, curr) => prev + curr, 0) / data.length);

export const getScoreCustomUnited = (data: any[]) => {
  if (data.length > 2) {
    data.sort((a, b) => a - b).pop();
    data.shift();
  }

  return getScoreUnited(data);
};
