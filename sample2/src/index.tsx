import * as React from "react";
import { registerWidget, registerLink, registerUI, IContextProvider, enableLocalization, registerCustomWidgetTemplate, } from './uxp';
import { TitleBar, FilterPanel, WidgetWrapper ,DataList} from "uxp/components";
import { IWDDesignModeProps } from "widget-designer/components";
import BundleConfig from '../bundle.json';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, AreaChart, CartesianGrid, Area, Tooltip, XAxis, YAxis } from 'recharts';

import './styles.scss';

export interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
    designer?: IWDDesignModeProps,
    uiProps?: any
}


const Sample2Widget: React.FunctionComponent<IWidgetProps> = (props) => {

    let [data,setData] =React.useState([])

    // let data=[
    //     { id: 1, name: 'John Doe',city:'norve' },
    //     { id: 2, name: 'Jane Doe',city:'oslo' },
    //     { id: 3, name: 'Mike Doe',city:'london' },
    //     { id: 4, name: 'Emma Doe',city:'paris' },
    //     { id: 5, name: 'Olivia Doe',city:'new york' },
    //     { id: 6, name: 'Sophia Doe',city:'tokyo' },
    //     { id: 7, name: 'Ava Doe',city:'madrid' },

   
    // ];

    React.useEffect(() => {
        // getData();
    }, []);

    async function getData(max: number, lastToken: string) {
        return new Promise<{ items: any[], pageToken: string }>((done, nope) => {
            let last = 0;
            if (lastToken) last = Number(lastToken);
    
        props.uxpContext.executeAction("Exam-Test-Model", "getdata", {}, {json:true})
        .then(res=>{
            // setData(res.result);
            done({items: res.result, pageToken: (last + res.result.length).toString() });
        })
        .catch(e=>{
            console.log(e);
            done({items: [], pageToken: lastToken });
        })
    }
)}

    function renderItem (item: any,key:number){
        return (
            <div className="sr-item" >
                
                <div className="item name">{item.name}</div>
                <div className="item email">{item.email}</div>
                <div className="item adrress">{item.address}</div>
                <div className="item city">{item.city}</div>

            </div>
        )
    }

    return (
        <WidgetWrapper className="sample2-widget-container">
            <TitleBar title='Sample2'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>
   
             <div className="container">
                
             <DataList
             data={getData}
             renderItem={renderItem}
             pageSize={10}
             />
   

             </div>

        </WidgetWrapper>
    )
}


//pichart

const SRChartWidget: React.FunctionComponent<IWidgetProps> = (props) =>{

    let [data,setData] = React.useState([])
  
    
// const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
      
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
     
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
     
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
     
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
      
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
     
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
     
//     },
//   ];

    React.useEffect(() => {
        getMarks();
    }, []);
  
    function getMarks(){
        props.uxpContext.executeAction("Exam-Test-Model", "getmarks", {}, {json:true})
        .then(res=>{
            console.log("response has came",res)
            let _data : any[] =[]
           for(let i of Object.keys(res.summary)){
             _data.push({name: res.summary[i].name , uv: res.summary[i].marks})
             setData(_data)
           }
        })
        .catch(e=>{
            console.log(e);
        })
    }
    
      
 
    return(

        
      <WidgetWrapper>
       <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="amt" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
      </WidgetWrapper>
    )
}

/**
 * Register as a Widget
 */
registerWidget({
    id: "sample2",
    widget: Sample2Widget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});

registerWidget({
    id: "srchart",
    widget: SRChartWidget,
    configs: {
        layout: {
            // w: 12,
            // h: 12,
            // minH: 12,
            // minW: 12
        }
    }
});


/**
 * Register as a Sidebar Link
 */
/*
registerLink({
    id: "sample2",
    label: "Sample2",
    // click: () => alert("Hello"),
    component: Sample2Widget
});
*/

/**
 * Register as a UI
 */

/*
registerUI({
   id:"sample2",
   component: Sample2Widget
});
*/


/**
 * Register as a Widget template
 * This will enable this widget to be edited through the designer
 */

/**
registerCustomWidgetTemplate({
    id: "sample2", // use all lowercase letters
    name: 'Sample2',
    description: 'Tempalte Description',
    template: Sample2Widget,
    moduleId: BundleConfig.id,
    complexity: 'advanced',
    icon: ['fas', 'list'],
    expectedSchema: 'dictionary-array'
});
*/


/**
 * Enable localization
 *
 * This will enable the localization
 *
 * you can use uxpContext.$L() function
 *
 * Ex: Assume you  have a localization message in localization json
 *
 * ```
 * // localization.json
 *
 * {
 *      "uxp.my-widget.title": {
 *          "en": "This is my widget" // english translation,
 *          "ar": "<arabic tranlation >",
 *          ... here goes other translations
 *      }
 * }
 *
 * ```
 *
 *
 * thne in your widget
 *
 * ```
 * // your widget
 *
 * return <WidgetWrapper>
 *      <div class='title'>
 *          {props.uxpContext.$L('uxp.my-widget.title')}
 *      </div>
 *  </WidgetWrapper>
 *
 * ```
 *
 * /// you can have parameters as well
 * // we use `$` mark to identify params
 * // Ex: $name, $location
 *
 * ```
 * // localization.json
 *
 * {
 *      ...
 *      "uxp.my-widget.user-welcom-msg":{
 *          "en": "$userName welcome to my widget"
 *      }
 * }
 * ```
 *
 * in widget
 *
 * ```
 *      ...
 *      <div> {props.uxpContext.$L('uxp.my-widget.user-welcom-msg', {userName: "Jane Doe"})} </div>
 * ```
 *
 *
 */

// enableLocalization()