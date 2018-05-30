export function round(value, decimals) {
  if (!decimals) decimals = 0;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

// return two decimal places rounded number
export function ratio({ width, height }) {
  return round(width / height, 2);
}

// takes the Gallery's images prop object, width of the container,
// margin between images Gallery prop, and columns Gallery prop.
// calculates, sizes based on columns and returns the images object with new height/width props
export function computeSizes({ images, columns, width, margin }) {
  if (!width) {
    return [];
  }
  // divide images over rows, max cells based on `columns`
  // effectively resulting in [[0, 1, 2], [3, 4, 5], [6, 7]]
  const rows = images.reduce((acc, cell, idx) => {
    const row = Math.floor(idx / columns);
    acc[row] = acc[row] ? [...acc[row], cell] : [cell]; // eslint-disable-line no-param-reassign
    return acc;
  }, []);

  // calculate total ratio of each row, and adjust each cell height and width
  // accordingly.
  const lastRowIndex = rows.length - 1;
  const rowsWithSizes = rows.map((row, rowIndex) => {
    const totalRatio = row.reduce((result, image) => result + ratio(image), 0);
    const rowWidth = width - row.length * (margin * 2);

    // assign height, but let height of a single image in the last
    // row not expand across columns so divide by columns
    const height = (rowIndex !== lastRowIndex || row.length > 1) // eslint-disable-line
        ? rowWidth / totalRatio
        : rowWidth / columns / totalRatio;

    return row.map(image => ({
      ...image,
      height: round(height, 1),
      width: round(height * ratio(image), 1),
    }));
  });
  return rowsWithSizes.reduce((acc, row) => [...acc, ...row], []);
}
