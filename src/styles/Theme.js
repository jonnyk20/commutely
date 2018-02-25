'use strict';

var redColor = (exports.redColor = '#FF0033');
var tealColor = (exports.tealColor = '#00E9EF');
var blueColor = (exports.blueColor = '#00BCD4');
var whiteColor = (exports.whiteColor = '#F9F9F9');
var blackColor = (exports.blackColor = '#000000');
var lightBlackColor = (exports.lightBlackColor = '#1D1D1D');
var darkGreyColor = (exports.darkGreyColor = '#2C2C2C');
var lightGreyColor = (exports.lightGreyColor = '#CCCCCC');
var lightGrey2Color = (exports.lightGrey2Color = '#F4F4F4');
var darkGreyColor = (exports.darkGreyColor = '#808080');
var greyColor = (exports.greyColor = '#C9C9C9');
var greenColor = (exports.greenColor = '#54DE8F');

var lightFont = (exports.lightFont = "'Proxima Nova Light', sans-serif");

var palette = (exports.palette = {
  textColor: darkGreyColor,
  primaryColor: redColor,
  secondaryColor: tealColor,
  secondaryDarkerColor: blueColor,
  disabledColor: lightGreyColor,
  saveColor: greenColor,
  deleteColor: redColor
});

//default theme that are applied to App.js
exports.styles = {
  chip: {
    deleteIconColor: whiteColor,
    backgroundColor: palette.secondaryColor,
    textColor: whiteColor
  },
  raisedButton: {
    backgroundColor: palette.primaryColor,
    primaryColor: palette.primaryColor,
    secondaryColor: palette.secondaryColor,
    textColor: palette.whiteColor
  },
  floatingActionButton: {
    buttonSize: 56,
    miniSize: 40,
    color: palette.secondaryColor,
    iconColor: whiteColor,
    secondaryColor: palette.primaryColor,
    secondaryIconColor: whiteColor,
    disabledTextColor: palette.disabledColor,
    disabledColor: greyColor
  },
  card: {
    titleColor: darkGreyColor,
    subtitleColor: greyColor
  }
};

//more customized themes that are regularly used on our site, e.g. delete button needs to be red, save needs to green
exports.custom = {
  deselectedChip: {
    backgroundColor: palette.disabledColor,
    color: whiteColor
  },
  darkTextInput: {
    color: whiteColor
  }
};
