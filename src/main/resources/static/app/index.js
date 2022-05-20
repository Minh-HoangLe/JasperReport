webix.protoUI(
  {
    name: 'search2',
    $cssName: 'search custom',
    $renderIcon: function () {
      var config = this.config;
      if (config.icons.length) {
        var height = config.aheight - 2 * config.inputPadding,
          padding = (height - 18) / 2 - 1,
          html = '',
          pos = 2;

        for (const element of config.icons) {
          html +=
            "<span style='right:" +
            pos +
            'px;height:' +
            (height - padding) +
            'px;padding-top:' +
            padding +
            "px;' class='webix_input_icon " +
            element +
            "'></span>";

          pos += 24;
        }
        return html;
      }
      return '';
    },
    on_click: {
      webix_input_icon: function (e, id, node) {
        var name = node.className.substr(node.className.indexOf('wxi-') + 4);
        if (name == 'close') {
          //delete icon
          this.setValue('');
        }
        return this.callEvent('on' + name + 'IconClick', [e]);
      },
    },
  },
  webix.ui.search,
);

webix.ready(async () => {
  webix.ui({
    container: 'widget-Body',
    id: 'planOut',
    rows: [
        //Header
        {
            height: 50,
            borderless: true,
            css: 'partition-page',
            template: `<div style='width: 100%; height: 100%; '>`+
                `<div class='info-page-name' style='display: flex; align-items: center; height: 100%'>`+
                `<div class="menu-icon">&#9776;</div>`+
                `<div class='page-name'>Plan Out</div>`+
                `</div>`+
                `<div class='info-account'>`+
                `<div class='notify-btn'>`+
                `<img alt='' src='/style/icon/bell-1.png'>`+
                `<span class='number-notify'>1</span>`+
                `</div>`+
                `<div class='user-avatar'>`+
                `<img alt='' src='/style/image/avatar.jpg' style='height: 80%; width: 80%; border-radius: 50%'>`+
                `</div>`+
                `<div class='user-name'>Marcus Memmott</div>`+
                `</div>`+
                `</div>`
        },
        //Page content
        {
            type: 'space',
            padding: 15,
            margin: 10,
            rows: [
                //control button
                {
                    cols: [
                        {
                            view: 'template',
                            borderless: true,
                            css: 'sub-menu-name',
                            template: `<div class='sub-menu-name'>Home ▶ BluePrint ▶ Plan Out</div>`
                        },
                        {
                            cols: [
                                { view: 'button', label: 'Retrieve', maxWidth: 100 },
                                { view: 'button', label: 'Create', maxWidth: 100 },
                                { view: 'button', label: 'Cancel', maxWidth: 100 },
                                { view: 'button', label: 'Excel', maxWidth: 100 },
                            ]
                        }
                    ]
                },
                //Search 1
                {
                    css: 'partition-page',
                    padding: 15,
                    cols:[
                        {
                            margin: 5,
                            rows: [
                                {
                                    view: 'combo',
                                    label: 'Status',
                                    labelAlign: 'right',
                                    value: 'ALL',
                                    options: [{id: 'ALL', value: 'ALL'}],
                                    labelWidth: 70,
                                },
                                {
                                    view: 'combo',
                                    label: 'DSP',
                                    labelAlign: 'right',
                                    value: 'ALL',
                                    options: [{id: 'ALL', value: 'ALL'}],
                                    labelWidth: 70,
                                },
                                { view: 'text', label: 'Plan No.', labelAlign: 'right', labelWidth: 70 },
                            ]
                        },
                        {
                            margin: 5,
                            rows: [
                                {
                                    cols: [
                                        { view: 'text', label: 'Vessel/Voyage', labelAlign: 'right', labelWidth: 120 },
                                        { view: 'button', type: 'icon', icon: 'wxi-search', width: 30 }
                                    ]
                                },
                                { view: 'text', label: 'DSP No.', labelAlign: 'right', labelWidth: 120 }
                            ]
                        },
                        {
                            margin: 5,
                            rows: [
                                {
                                    cols: [
                                        { view: 'text', label: 'Booking/BL No.', labelAlign: 'right', labelWidth: 120 },
                                        { view: 'button', type: 'icon', icon: 'wxi-search', width: 30 }
                                    ]
                                },
                                {
                                    view: 'combo',
                                    label: 'Mode',
                                    labelAlign: 'right',
                                    value: 'ALL',
                                    options: [{id: 'ALL', value: 'ALL'}],
                                    labelWidth: 120
                                }
                            ]
                        },
                        {
                            margin: 5,
                            rows: [
                                { view: 'text', label: 'Container No.', labelAlign: 'right', labelWidth: 120 },
                                { view: 'text', label: 'Truck/Train No.', labelAlign: 'right', labelWidth: 120 }
                            ]
                        },
                        {
                            margin: 5,
                            rows: [
                                {
                                    view: 'combo',
                                    label: 'Size/Type',
                                    labelAlign: 'right',
                                    value: 'ALL',
                                    options: [{id: 'ALL', value: 'ALL'}],
                                    labelWidth: 120
                                },
                                {
                                    cols: [
                                        { view: 'text', label: 'Shipping Line', labelAlign: 'right', labelWidth: 120 },
                                        { view: 'button', type: 'icon', icon: 'wxi-search', width: 30 }
                                    ]
                                },
                            ]
                        }
                    ]
                },
                //Search 2
                {
                    css: 'partition-page',
                    padding: 15,
                    cols: [
                        {
                            gravity: 1.5,
                            cols: [
                                {
                                    view: 'combo',
                                    label: 'Mode',
                                    labelAlign: 'right',
                                    value: 'ALL',
                                    options: [{id: 'ALL', value: 'ALL'}],
                                    labelWidth: 70
                                },
                                {
                                    cols: [
                                        { view: 'text', label: 'Truck/Rail Company', labelAlign: 'right', labelWidth: 140 },
                                        { view: 'button', type: 'icon', icon: 'wxi-search', width: 30 }
                                    ]
                                },
                                { view: 'text', label: 'Truck/Train No.', labelAlign: 'right', labelWidth: 120 },
                            ]
                        },
                        {}
                    ]
                },
                //Table and button control
                {
                    css: 'partition-page',
                    padding: 15,
                    height: 495,
                    margin: 5,
                    rows: [
                        {
                            view: 'datatable',
                            pager: 'pager',
                            select: 'row',
                            scroll: false,
                            tooltip: true,
                            scheme: {
                                $init(item) {
                                    if (item.id % 2 === 0) item.$css = 'high-light-row';
                                },
                            },
                            columns: [
                                {
                                    tooltip: false,
                                    header: { content: 'masterCheckbox', contentId: 'checkControl' },
                                    template: '{common.checkbox()}',
                                    checkValue: 1,
                                    uncheckValue: 0,
                                    minWidth: 40,
                                    fillspace: 0.5,
                                    tooltip: false,
                                },
                                {
                                    id: 'chk',
                                    header: { text: 'CHK' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'ctnNo',
                                    header: { text: 'Container No.' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'size',
                                    header: { text: 'Size/Type' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'condition',
                                    header: { text: 'Condition' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'mode',
                                    header: { text: 'Mode' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'truckRC',
                                    header: { text: 'Truck/Rail Company' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'truckRNo',
                                    header: { text: 'Truck/Rail No.' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'singW',
                                    header: { text: 'Single Wagon' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'caWe',
                                    header: { text: 'Cargo Weight' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'taWe',
                                    header: { text: 'Tare Weight' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'maWe',
                                    header: { text: 'Material Weight' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'vgm',
                                    header: { text: 'VGM' },
                                    fillspace: true,
                                    sort: 'text'
                                },
                                {
                                    id: 'vgmSi',
                                    header: { text: 'VGM Signature' },
                                    fillspace: true,
                                    sort: 'text'
                                }
                            ],
                            data:[
                                { chk: 'Gita Noda', ctnNo: 'Gita Noda', size: 'Gita Noda', condition: 'Gita Noda', mode: 'Gita Noda', truck: 'Gita Noda',  truckRC: 'Gita Noda', truckRNo: 'Gita Noda', singW: 'Gita Noda', caWe: 'Gita Noda', taWe: 'Gita Noda' , maWe: 'Gita Noda', vgm: 'Gita Noda', vgmSi: 'Gita Noda' },
                                { chk: 'Gita Noda', ctnNo: 'Gita Noda', size: 'Gita Noda', condition: 'Gita Noda', mode: 'Gita Noda', truck: 'Gita Noda',  truckRC: 'Gita Noda', truckRNo: 'Gita Noda', singW: 'Gita Noda', caWe: 'Gita Noda', taWe: 'Gita Noda' , maWe: 'Gita Noda', vgm: 'Gita Noda', vgmSi: 'Gita Noda' },
                                { chk: 'Gita Noda', ctnNo: 'Gita Noda', size: 'Gita Noda', condition: 'Gita Noda', mode: 'Gita Noda', truck: 'Gita Noda',  truckRC: 'Gita Noda', truckRNo: 'Gita Noda', singW: 'Gita Noda', caWe: 'Gita Noda', taWe: 'Gita Noda' , maWe: 'Gita Noda', vgm: 'Gita Noda', vgmSi: 'Gita Noda' },
                                { chk: 'Gita Noda', ctnNo: 'Gita Noda', size: 'Gita Noda', condition: 'Gita Noda', mode: 'Gita Noda', truck: 'Gita Noda',  truckRC: 'Gita Noda', truckRNo: 'Gita Noda', singW: 'Gita Noda', caWe: 'Gita Noda', taWe: 'Gita Noda' , maWe: 'Gita Noda', vgm: 'Gita Noda', vgmSi: 'Gita Noda' },
                                { chk: 'Gita Noda', ctnNo: 'Gita Noda', size: 'Gita Noda', condition: 'Gita Noda', mode: 'Gita Noda', truck: 'Gita Noda',  truckRC: 'Gita Noda', truckRNo: 'Gita Noda', singW: 'Gita Noda', caWe: 'Gita Noda', taWe: 'Gita Noda' , maWe: 'Gita Noda', vgm: 'Gita Noda', vgmSi: 'Gita Noda' }
                            ]
                        },
                        {
                            view: 'pager',
                            id: 'pager',
                            size:50,
                            group:5,
                            template: '{common.prev()}Page {common.page()} from #limit#{common.next()}'
                        }
                    ]
                },
                //Truck and train
                {
                    css: 'partition-page',
                    padding: 15,
                    margin: 5,
                    rows: [
                        { view: 'text', label: 'Truck', labelAlign: 'right', labelWidth: 55 },
                        { view: 'text', label: 'Train', labelAlign: 'right', labelWidth: 55 },
                    ]
                }
            ]
        }
      // {
      //   cols: [
      //     {
      //       type: 'header',
      //       template: 'Plan Out',
      //       height: 30,
      //       css: {
      //         border: 'none',
      //         'border-bottom': '1px solid #2997cc !important ',
      //       },
      //     },
      //     {
      //       type: 'header',
      //       template: 'Home > Gate > Plan Out',
      //       height: 30,
      //       width: 200,
      //       css: {
      //         border: 'none',
      //         'text-align': 'left',
      //         'border-bottom': '1px solid #2997cc !important ',
      //       },
      //     },
      //   ],
      // },
      // {
      //   cols: [
      //     {},
      //     {
      //       view: 'button',
      //       value: 'Retrieve',
      //       width: 70,
      //     },
      //     {
      //       view: 'button',
      //       value: 'Create',
      //       width: 70,
      //     },
      //     {
      //       view: 'button',
      //       value: 'Cancel',
      //       width: 70,
      //     },
      //     {
      //       view: 'button',
      //       value: 'Excel',
      //       width: 70,
      //     },
      //   ],
      // },
      // { height: 5 },
      // {
      //   view: 'form',
      //   borderless: true,
      //   padding: 10,
      //   margin: 0,
      //   rows: [
      //     {
      //       cols: [
      //         {
      //           view: 'combo',
      //           label: 'Status',
      //           value: 'Empty',
      //           options: ['Empty'],
      //         },
      //         {
      //           view: 'search',
      //           label: 'Vessel/Voyage',
      //           labelWidth: 120,
      //         },
      //         {
      //           view: 'search2',
      //           label: 'Booking/BL No.',
      //           icons: ['wxi-search', 'wxi-close'],
      //           labelWidth: 120,
      //           on: {
      //             onSearchIconClick: function () {
      //               webix.message('search');
      //             },
      //             onCloseIconClick: function () {
      //               webix.message('close');
      //             },
      //           },
      //         },
      //         {
      //           view: 'text',
      //           label: 'Container No.',
      //           labelWidth: 120,
      //         },
      //         {
      //           view: 'combo',
      //           label: 'Size/Type',
      //           value: 'All',
      //           options: ['All', '1', '2'],
      //         },
      //       ],
      //     },
      //     {
      //       cols: [
      //         {
      //           view: 'combo',
      //           label: 'DSP',
      //           value: 'N',
      //           options: ['N', 'M', 'J', 'K'],
      //         },
      //         {
      //           view: 'text',
      //           label: 'DSP No.',
      //           labelWidth: 120,
      //         },
      //         {
      //           view: 'combo',
      //           label: 'Mode',
      //           // value: 'All',
      //           options: ['All', '1', '2'],
      //         },
      //         {
      //           view: 'text',
      //           label: 'Truck/Train No.',
      //           labelWidth: 120,
      //         },
      //         {
      //           view: 'search2',
      //           label: 'Shipping Line',
      //           icons: ['wxi-search', 'wxi-close'],
      //           labelWidth: 120,
      //           on: {
      //             onSearchIconClick: function () {
      //               webix.message('search');
      //             },
      //             onCloseIconClick: function () {
      //               webix.message('close');
      //             },
      //           },
      //         },
      //       ],
      //     },
      //     {
      //       cols: [
      //         {
      //           view: 'text',
      //           label: 'Plan No.',
      //           width: 300,
      //         },
      //         {},
      //       ],
      //     },
      //   ],
      // },
      // { height: 5 },
      // {
      //   view: 'form',
      //   borderless: true,
      //   padding: 10,
      //   margin: 0,
      //   cols: [
      //     {
      //       view: 'combo',
      //       label: 'Mode',
      //       // value: 'All',
      //       options: ['All', '1', '2'],
      //     },
      //     {
      //       view: 'search',
      //       label: 'Truck/Rail Company',
      //       labelWidth: 150,
      //     },
      //     {
      //       view: 'text',
      //       label: 'Truck/Train No.',
      //       width: 300,
      //       labelWidth: 120,
      //     },
      //     {},
      //   ],
      // },
      // { height: 5 },
      // {
      //   view: 'datatable',
      //   select: 'row',
      //   height: 400,
      //   columns: [
      //     {
      //       header: { content: 'masterCheckbox', contentId: 'checkControl' },
      //       template: '{common.checkbox()}',
      //       checkValue: 1,
      //       uncheckValue: 0,
      //       minWidth: 40,
      //       fillspace: 0.5,
      //       tooltip: false,
      //     },
      //     {
      //       header: { text: 'CHK' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Container No.' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Size/Type' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Condition' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Mode' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Truck/Rail Company' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Truck/Rail No.' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Single Wagon' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Cargo Weight' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Tare Weight' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'Material Weight' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'VGM' },
      //       fillspace: true,
      //     },
      //     {
      //       header: { text: 'VGM Signature' },
      //       fillspace: true,
      //     },
      //   ],
      // },
      // { height: 5 },
      // {
      //   view: 'form',
      //   borderless: true,
      //   padding: 10,
      //   margin: 0,
      //   elements: [
      //     {
      //       view: 'text',
      //       label: 'Truck',
      //     },
      //
      //     {
      //       view: 'text',
      //       label: 'Train',
      //     },
      //   ],
      // },
      //   {
      //     cols: [
      //       {
      //         id: 'reportComboId',
      //         view: 'combo',
      //         label: 'List Report',
      //         width: 300,
      //         name: 'report',
      //         options: [
      //           { id: 1, value: 'Employee Report', fileNm: 'employeeReport' },
      //           { id: 2, value: 'Product Report', fileNm: 'productReport' },
      //         ],
      //       },
      //       {
      //         id: 'typeExport',
      //         view: 'radio',
      //         name: 'type',
      //         value: '1',
      //         options: [
      //           { id: 'PDF', value: 'PDF' },
      //           { id: 'EXCEL', value: 'EXCEL' },
      //         ],
      //       },
      //       {},
      //       {
      //         view: 'button',
      //         value: 'Export',
      //         width: 100,
      //         click: function () {
      //           axios
      //             .get('/employee/export', {
      //               params: {
      //                 fileName: $$('reportComboId')
      //                   .getList()
      //                   .getItem($$('reportComboId').getValue()).fileNm,
      //                 type: $$('typeExport').getValue(),
      //               },
      //               responseType: 'arraybuffer',
      //             })
      //             .then((res) => {
      //               download(
      //                 res.data,
      //                 `${(Math.random() * 100000).toFixed(0)}.${
      //                   $$('typeExport').getValue() === 'PDF' ? 'pdf' : 'xlsx'
      //                 }
      //                     `,
      //                 res.headers['content-type'],
      //               );
      //             })
      //             .catch((err) => {
      //               console.log(err);
      //             });
      //         },
      //       },
      //     ],
      //   },
    //   { view: 'resizer' },
    ],
  });
  $(window).resize(() => {
    $$('planOut').resize();
  });
});
