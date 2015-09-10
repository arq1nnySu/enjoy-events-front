import React from 'react';
import mui from  'material-ui';

var ThemeManager = new mui.Styles.ThemeManager();

export default (ComposedComponent) => {
  return class MaterialComponent extends React.Component {

    constructor() {
      super()
         this.context =  {
            muiTheme: ThemeManager.getCurrentTheme()
      };
       this.childContextTypes =  {
            muiTheme: ThemeManager.getCurrentTheme()
      };
    }

	getChildContext(){
	    return {
	        muiTheme: ThemeManager.getCurrentTheme()
	    };
	}
	 
	 componentWillMount() {
	    ThemeManager.setComponentThemes({
	      // flatButton: {
	      // 	color: "cyan500",
	      //   textColodr: "white"
	      // }
	    });
	  }

    render() {
      return (
      <ComposedComponent
        {...this.props} />
      );
    }
  }
};

React.Component.childContextTypes = { muiTheme: ThemeManager.getCurrentTheme() };