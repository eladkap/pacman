function Sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function ReadTextFile(txtFile) {
  var allText = loadStrings(txtFile);
  return allText;
}
