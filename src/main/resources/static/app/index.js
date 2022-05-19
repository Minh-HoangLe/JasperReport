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
    // type: 'clean',
    rows: [
      {
        cols: [
          {
            type: 'header',
            template: 'Plan Out',
            height: 30,
            css: {
              border: 'none',
              'border-bottom': '1px solid #2997cc !important ',
            },
          },
          {
            type: 'header',
            template: 'Home > Gate > Plan Out',
            height: 30,
            width: 200,
            css: {
              border: 'none',
              'text-align': 'left',
              'border-bottom': '1px solid #2997cc !important ',
            },
          },
        ],
      },
      { height: 5 },
      {
        cols: [
          {},
          {
            view: 'button',
            value: 'Retrieve',
            width: 70,
          },
          {
            view: 'button',
            value: 'Create',
            width: 70,
          },
          {
            view: 'button',
            value: 'Cancel',
            width: 70,
          },
          {
            view: 'button',
            value: 'Excel',
            width: 70,
          },
        ],
      },
      { height: 5 },
      {
        view: 'form',
        borderless: true,
        padding: 10,
        margin: 0,
        rows: [
          {
            cols: [
              {
                view: 'combo',
                label: 'Status',
                value: 'Empty',
                options: ['Empty'],
              },
              {
                view: 'search',
                label: 'Vessel/Voyage',
                labelWidth: 120,
              },
              {
                view: 'search2',
                label: 'Booking/BL No.',
                icons: ['wxi-search', 'wxi-close'],
                labelWidth: 120,
                on: {
                  onSearchIconClick: function () {
                    webix.message('search');
                  },
                  onCloseIconClick: function () {
                    webix.message('close');
                  },
                },
              },
              {
                view: 'text',
                label: 'Container No.',
                labelWidth: 120,
              },
              {
                view: 'combo',
                label: 'Size/Type',
                value: 'All',
                options: ['All', '1', '2'],
              },
            ],
          },
          {
            cols: [
              {
                view: 'combo',
                label: 'DSP',
                value: 'N',
                options: ['N', 'M', 'J', 'K'],
              },
              {
                view: 'text',
                label: 'DSP No.',
                labelWidth: 120,
              },
              {
                view: 'combo',
                label: 'Mode',
                // value: 'All',
                options: ['All', '1', '2'],
              },
              {
                view: 'text',
                label: 'Truck/Train No.',
                labelWidth: 120,
              },
              {
                view: 'search2',
                label: 'Shipping Line',
                icons: ['wxi-search', 'wxi-close'],
                labelWidth: 120,
                on: {
                  onSearchIconClick: function () {
                    webix.message('search');
                  },
                  onCloseIconClick: function () {
                    webix.message('close');
                  },
                },
              },
            ],
          },
          {
            cols: [
              {
                view: 'text',
                label: 'Plan No.',
                width: 300,
              },
              {},
            ],
          },
        ],
      },
      { height: 5 },
      {
        view: 'form',
        borderless: true,
        padding: 10,
        margin: 0,
        cols: [
          {
            view: 'combo',
            label: 'Mode',
            // value: 'All',
            options: ['All', '1', '2'],
          },
          {
            view: 'search',
            label: 'Truck/Rail Company',
            labelWidth: 150,
          },
          {
            view: 'text',
            label: 'Truck/Train No.',
            width: 300,
            labelWidth: 120,
          },
          {},
        ],
      },
      { height: 5 },
      {
        view: 'datatable',
        select: 'row',
        height: 400,
        columns: [
          {
            header: { content: 'masterCheckbox', contentId: 'checkControl' },
            template: '{common.checkbox()}',
            checkValue: 1,
            uncheckValue: 0,
            minWidth: 40,
            fillspace: 0.5,
            tooltip: false,
          },
          {
            header: { text: 'CHK' },
            fillspace: true,
          },
          {
            header: { text: 'Container No.' },
            fillspace: true,
          },
          {
            header: { text: 'Size/Type' },
            fillspace: true,
          },
          {
            header: { text: 'Condition' },
            fillspace: true,
          },
          {
            header: { text: 'Mode' },
            fillspace: true,
          },
          {
            header: { text: 'Truck/Rail Company' },
            fillspace: true,
          },
          {
            header: { text: 'Truck/Rail No.' },
            fillspace: true,
          },
          {
            header: { text: 'Single Wagon' },
            fillspace: true,
          },
          {
            header: { text: 'Cargo Weight' },
            fillspace: true,
          },
          {
            header: { text: 'Tare Weight' },
            fillspace: true,
          },
          {
            header: { text: 'Material Weight' },
            fillspace: true,
          },
          {
            header: { text: 'VGM' },
            fillspace: true,
          },
          {
            header: { text: 'VGM Signature' },
            fillspace: true,
          },
        ],
      },
      { height: 5 },
      {
        view: 'form',
        borderless: true,
        padding: 10,
        margin: 0,
        elements: [
          {
            view: 'text',
            label: 'Truck',
          },

          {
            view: 'text',
            label: 'Train',
          },
        ],
      },
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
});
