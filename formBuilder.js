(function (window, $) {
  var FormBody = function (params) {
    return this.init(params);
  };

  FormBody.prototype = {
    init: function (params) {
      this.params = params;
      this.build().bindEvents();

      return this.$form;
    },

    _createBlock: function (el) {
      return $('<' + el.type + '/>', {
        class: el.className ? el.className : '',
      });
    },

    _createPage: function (el) {
      var $page = $('<div>', {
        'data-id': el.pageId,
        class: el.className ? el.className : '',
      });

      if (el.observer) {
        el.observer($page);
      }

      return $page;
    },

    _createRow: function (el) {
      return $('<div />', {
        class: 'row' + (el.className ? el.className : ''),
      });
    },

    _createCol: function (el) {
      var $section = $('<section />', {
        class: 'col ' + (el.className ? el.className : ''),
      });

      if (el.observer) {
        el.observer($section);
      }

      return $section;
    },

    _createLabel: function (el) {
      var $label = $('<label />', {
        class: 'label' + el.className ? el.className : '',
        text: el.text,
      });

      if (el.required) {
        $label.append(
          $('<span />', {
            class: 'required text-danger',
            text: ' *',
          })
        );
      }

      return $label;
    },

    _createImage: function (el) {
      var $image = null;
      if (el.src) {
        $image = $('<img />', {
          src: el.src,
          width: el.width ? el.width : 'auto',
          height: el.height ? el.height : 'auto',
          id: el.id ? el.id : null,
          class: el.className ? el.className : '',
        });
      } else {
        $image = $('<span />');
      }

      return $image;
    },

    _createInput: function (el) {
      var $labelWrap = $('<label />', {
        class: 'input',
      });

      var $input = $('<input />', {
        class: 'form-control' + el.className ? el.className : '',
        type: 'text',
        required: el.required,
        value: el.value !== null ? el.value : '',
        'data-type': el.dataType ? el.dataType : 'string',
        disabled: el.disabled ? true : false,
        placeholder: el.placeholder ? el.placeholder : '',
        novalidate: el.novalidate ? true : false,
        autoComplete: false,
      });

      if (el.name) {
        $input.attr('name', el.name);
      }

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $input.on(key, function () {
            fn($(this));
          });
        });
      }

      return $labelWrap.append($input);
    },

    _createPassword: function (el) {
      var $labelWrap = $('<label />', {
        class: 'input',
      });

      var $input = $('<input />', {
        class: 'form-control' + el.className ? el.className : '',
        type: 'password',
        required: el.required,
        value: el.value !== null ? el.value : '',
        'data-type': el.dataType ? el.dataType : 'string',
        disabled: el.disabled ? true : false,
        placeholder: el.placeholder ? el.placeholder : '',
        novalidate: el.novalidate ? true : false,
        autoComplete: false,
      });

      if (el.name) {
        $input.attr('name', el.name);
      }

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $input.on(key, function () {
            fn($(this));
          });
        });
      }

      return $labelWrap.append($input);
    },

    _createJSONInput: function (el) {
      var $input = $('<input />', {
        type: 'hidden',
        'data-type': 'object',
        'data-spec': 'JSON',
        name: el.name ? el.name : '',
        value: el.value ? el.value : '',
      });
      return $input;
    },

    _createDateInput: function (el) {
      var $labelWrap = $('<label />', {
        class: 'input',
      });

      var $input = $('<input />', {
        class: 'form-control' + el.className ? el.className : 'datepicker',
        type: 'text',
        disabled: el.disabled || false,
        required: el.required,
        name: el.name ? el.name : '',
        value: el.value ? el.value : '',
        'data-type': el.dataType ? el.dataType : 'date',
        'data-datepicker': '',
        placeholder: el.placeholder ? el.placeholder : '',
      });

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $input.on(key, function () {
            fn($(this));
          });
        });
      }

      return $labelWrap.append($input);
    },

    _createFileBrowser: function (el) {
      var $labelWrap = $('<label />', {
        class: 'input input-file',
      });

      var $button = $('<div />', {
        class: 'button',
        html: $('<a>', {
          href: '/ELFinder/OpenChooser',
          'data-toggle': 'modal',
          'data-target': '#fileFinderModal',
          text: el.buttonText,
        }),
      });

      var $input = $('<input />', {
        id: el.id ? el.id : '',
        class: 'form-control' + el.className ? el.className : '',
        type: 'text',
        required: el.required,
        name: el.name ? el.name : '',
        value: el.value ? el.value : '',
        'data-type': el.dataType ? el.dataType : 'string',
        placeholder: el.placeholder ? el.placeholder : '',
      });

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $input.on(key, function () {
            fn($(this));
          });
        });
      }

      return $labelWrap.append($button, $input);
    },

    _createPlainFileBrowser: function (el) {
      var $fileInputWrap = $('<div>');
      var $labelWrap = $('<label />', {
        class: 'btn btn-info btn-xs',
        css: {
          width: '100px',
          'margin-right': '10px',
        },
        text: 'Browse',
      });

      var $input = $('<input />', {
        class: 'form-control' + el.className ? el.className : '',
        type: 'file',
        accept: el.accept ? el.accept : '*/*',
        required: el.required,
        name: el.name ? el.name : '',
        value: el.value ? el.value : '',
        'data-type': el.dataType ? el.dataType : 'string',
        placeholder: el.placeholder ? el.placeholder : '',
        css: {
          display: 'none',
        },
      });

      var $fileName = $('<span>', {
        class: 'file-name',
        css: {
          width: '200px',
          'text-overflow': 'ellipsis',
          overflow: 'hidden',
          'white-space': 'nowrap',
          display: 'inline-block',
        },
      });

      $input.on('change', function (e) {
        var file = this.files[0];
        var allowedExt = ['png', 'jpg', 'jpeg', 'bmp', 'pdf'];

        if (file.size / 1024 > 20000) {
          alert('File exeeds maximum allowed size.');
        }

        if (!~allowedExt.indexOf(file.type.split('/')[1].toLowerCase())) {
          alert('File type not allowed.');
        }

        $fileName.text(file.name);
        var $fileNameInput = $('#modalRoot form').find('[name="Name"]');

        if ($fileNameInput.length) {
          var pureName = file.name.split('.');
          pureName.pop();
          if (!$fileNameInput.val()) $fileNameInput.val(pureName.join(''));
        }
      });

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $input.on(key, function () {
            fn($(this));
          });
        });
      }

      return $fileInputWrap.append($labelWrap.append($input), $fileName);
    },

    _createTextEditor: function (el) {
      var $textArea = $('<textarea />', {
        id: 'textarea_' + Hasher.sign(5),
        class: 'textarea texteditor',
        name: el.name ? el.name : '',
        text: el.value ? el.value : '',
      });

      return $textArea;
    },

    _createTextArea: function (el) {
      var $textArea = $('<textarea />', {
        class: el.className ? el.className : '',
        name: el.name ? el.name : '',
        width: el.width,
        height: el.height,
        resize: el.resizable ? true : false,
        required: el.required ? true : false,
        class: 'form-control' + el.className ? el.className : '',
      });

      if (el.value) {
        $textArea.text(el.value);
      }

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $textArea.on(key, function () {
            fn($(this));
          });
        });
      }

      return $textArea;
    },

    _createHidden: function (el) {
      var $hidden = $('<input />', {
        type: 'hidden',
        name: el.name ? el.name : '',
        value: el.value ? el.value : '',
        'data-type': el.dataType ? el.dataType : 'string',
      });

      return $hidden;
    },

    _createSelect: function (el) {
      var $select = $('<select />', {
        required: el.required,
        class: 'form-control ' + (el.className ? el.className : ''),
        name: el.name ? el.name : '',
        disabled: el.disabled ? true : false,
        id: el.id ? el.id : null,
        'data-type': el.dataType ? el.dataType : '',
      });

      if (el.defaultOption) {
        $select.append(
          $('<option />', {
            value: el.defaultOption.value,
            text: el.defaultOption.text,
          })
        );
      }

      if (el.options) {
        $.each(el.options, function (i, o) {
          $select.append(
            $('<option />', {
              value: o.value,
              text: o.text,
              disabled: o.disabled,
              'data-url': o.dataUrl ? o.dataUrl : '',
            })
          );
        });
      }

      if (el.optionsWithGroups) {
        $.each(el.optionsWithGroups, function (key, optGroup) {
          if (key === '__NOOPTGROUP__') {
            $.each(optGroup.options, function (i, o) {
              $select.append(
                $('<option>', {
                  value: o.value,
                  text: o.text,
                  disabled: o.disabled,
                  'data-url': o.dataUrl ? o.dataUrl : '',
                })
              );
            });

            return true;
          }

          if (optGroup.options.length) {
            var $optGroup = $('<optgroup>', {
              label: optGroup.label ? optGroup.label : null,
            });

            $.each(optGroup.options, function (i, o) {
              $optGroup.append(
                $('<option>', {
                  value: o.value,
                  text: o.text,
                  disabled: o.disabled,
                  'data-url': o.dataUrl ? o.dataUrl : '',
                })
              );
            });

            $select.append($optGroup);
          }
        });
      }

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $select.on(key, function () {
            fn($(this));
          });
        });
      }

      if (
        typeof el.value !== 'undefined' &&
        el.value !== null &&
        el.value != ''
      ) {
        $select.val($select.find('option[value=' + el.value + ']').val());
      }

      return $select;
    },

    _createMultiSelect: function (el) {
      var $select = $('<select />', {
        multiple: true,
        required: el.required,
        class: 'form-control ' + (el.className ? el.className : ''),
        name: el.name ? el.name : '',
        disabled: el.disabled ? true : false,
        id: el.id ? el.id : '',
        'data-type': el.dataType ? el.dataType : '',
        value: el.value || '',
      });

      if (el.options) {
        $.each(el.options, function (i, o) {
          $select.append(
            $('<option />', {
              value: o.value,
              text: o.text,
              disabled: o.disabled,
              'data-url': o.dataUrl ? o.dataUrl : '',
            })
          );
        });
      }
      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $select.on(key, function () {
            fn($(this));
          });
        });
      }

      return $select;
    },

    _createCheckbox: function (el) {
      var $labelWrap = $('<label />', {
          class: 'checkbox',
        }),
        $checkbox = $('<input />', {
          type: 'checkbox',
          name: el.name ? el.name : '',
          value: el.value ? el.value : '',
          'data-type': el.dataType ? el.dataType : 'bool',
        }),
        $i = $('<i/>'),
        $span = $('<span/>', {
          text: el.text,
        });

      if (!$.isEmptyObject(el.action)) {
        $.each(el.action, function (key, fn) {
          $checkbox.on(key, function () {
            fn($(this));
          });
        });
      }

      $checkbox.prop('checked', el.checked);

      return $labelWrap.append($checkbox, $i, $span);
    },

    _createNote: function (el) {
      var $elem = $('<div>', {
        class: 'note',
        text: el.text || '',
      });

      if (el.html) {
        $elem.html(el.html);
      }

      return $elem;
    },

    _createButton: function (el) {
      var $button = $('<button />', {
        class: 'btn ' + (el.className ? el.className : ''),
        text: el.text,
        type: el.type,
        disabled: el.disabled || false,
      });

      if (el.action) {
        $button.on(el.action.eventType, function () {
          el.action.fn($(this));
        });
      }

      return $button;
    },

    _createTable: function (el) {
      var $table = $('<table />', {
        id: el.id,
        class: 'table table-striped table-bordered table-hover',
      });

      var $thead = $('<thead />');
      var $theadTr = $('<tr />');

      $.each(el.thead.tds, function (i, th) {
        var $th = $('<th>').text(th);
        $theadTr.append($th);
      });

      $thead.append($theadTr);
      $table.append($thead);
      if (el.actions.length) {
        $.each(el.actions, function (i, a) {
          $table.on('click', a.target, a.fn);
        });
      }

      return $table;
    },

    _domBuilder: function (params, $wrapper) {
      var _self = this;
      if (params.pages) {
        $.each(params.pages, function (idx, page) {
          $page = _self._createPage(page);
          $wrapper.append($page);

          return _self._domBuilder(page, $page);
        });
      }

      if (params.blocks) {
        $.each(params.blocks, function (idx, block) {
          $block = _self._createBlock(block);
          $wrapper.append($block);

          return _self._domBuilder(block, $block);
        });
      }

      if (params.rows) {
        $.each(params.rows, function (idx, row) {
          $row = _self._createRow(row);
          $wrapper.append($row);

          return _self._domBuilder(row, $row);
        });
      }

      if (params.cols) {
        $.each(params.cols, function (idx, col) {
          if (!col) return true;
          if (col.skip) return true;
          $col = _self._createCol(col);
          $wrapper.append($col);

          return _self._domBuilder(col, $col);
        });
      }

      if (params.formEntities) {
        $.each(params.formEntities, function (i, fe) {
          switch (fe.elemType) {
            case 'label':
              $wrapper.append(_self._createLabel(fe));
              break;

            case 'input':
              $wrapper.append(_self._createInput(fe));
              break;
            case 'password':
              $wrapper.append(_self._createPassword(fe));
              break;
            case 'json-input':
              $wrapper.append(_self._createJSONInput(fe));
              break;
            case 'date':
              $wrapper.append(_self._createDateInput(fe));
              break;

            case 'file':
              $wrapper.append(_self._createFileBrowser(fe));
              break;

            case 'file-plain':
              $wrapper.append(_self._createPlainFileBrowser(fe));
              break;

            case 'texteditor':
              $wrapper.append(_self._createTextEditor(fe));
              break;
            case 'textarea':
              $wrapper.append(_self._createTextArea(fe));
              break;

            case 'hidden':
              $wrapper.append(_self._createHidden(fe));
              break;

            case 'select':
              $wrapper.append(_self._createSelect(fe));
              break;

            case 'multi-select':
              $wrapper.append(_self._createMultiSelect(fe));
              break;

            case 'checkbox':
              $wrapper.append(_self._createCheckbox(fe));
              break;

            case 'button':
              $wrapper.append(_self._createButton(fe));
              break;

            case 'table':
              $wrapper.append(_self._createTable(fe));
              break;

            case 'note':
              $wrapper.append(_self._createNote(fe));
              break;

            case 'image':
              $wrapper.append(_self._createImage(fe));
              break;
          }
        });
      }
    },

    build: function () {
      var _self = this;

      var $form = $('<form />', {
        method: this.params.method ? this.params.method : '',
        action:
          this.params.Controller && this.params.Method
            ? '/' + this.params.Controller + '/' + this.params.Method
            : '',
        class:
          'smart-form ' + (this.params.className ? this.params.className : ''),
        id: this.params.id,
      });

      this._domBuilder(this.params, $form);

      this.$form = $form;

      return this;
    },

    bindEvents: function () {
      new Form(this.$form, {
        serializeAs: this.params.serializeAs,
        url: this.params.url,
        Controller: this.params.Controller,
        Method: this.params.Method,
        success: this.params.success,
        tabs: this.params.tabs,
        pageForms: this.params.pageForms,
        trackChanges: this.params.trackChanges,
      });

      this.$form
        .find('[data-datepicker]')
        .datetimepicker({
          format: 'YYYY-MM-DD HH:mm',
          showClose: true,
          icons: { close: 'glyphicon glyphicon-ok' },
        })
        .on('dp.change', function () {
          $(this).trigger('change');
        });
    },
  };

  var Form = function ($form, options) {
    return this.init($form, options);
  };

  Form.prototype = {
    errClassName: 'err',
    $form: null,

    init: function ($form, options) {
      this.$form = $form;
      this.options = options;

      this.addEvents();
    },

    _collectData: function ($form) {
      $fields = $form.find('input, select, textarea');
      data = {};

      $.each($fields, function () {
        var $el = $(this),
          key = $el.attr('name'),
          value;

        if ($el.prop('tagName') === 'TEXTAREA' && $el.hasClass('texteditor')) {
          var selector = $el.attr('id');
          CKEDITOR.config.autoParagraph = false;
          value = CKEDITOR.instances[selector].getData();

          data[key] = value;
          return true;
        }

        switch ($el.data('type')) {
          case 'int':
            value = parseInt($el.val());
            break;
          case 'string':
            value = $el.val().toString();
            break;
          case 'bool':
            value = $el.prop('checked') === true;
            break;
          default:
            value = $el.val();
        }

        data[key] = value;
      });

      return data;
    },

    addEvents: function () {
      var _self = this,
        url = this.url,
        method = 'POST';

      this.$form.on('submit', function (e) {
        e.preventDefault();
        var data = null;
        var $fields = null;
        var $listFields = null;

        if (_self.options.serializeAs === 'table') {
          data = [];
          var $trs = _self.$form.find('table tbody > tr');

          $.each($trs, function () {
            $fields = $(this).find('input, select, textarea');
            var dataItem = {};

            $.each($fields, function () {
              var $el = $(this);

              switch ($el.data('type')) {
                case 'int':
                  value = parseInt($el.val());
                  break;
                case 'string':
                  value = $el.val().toString();
                  break;
                case 'bool':
                  value = $el.prop('checked') === true;
                  break;
                default:
                  value = $el.val();
              }

              dataItem[$el.attr('name')] = value;
            });

            data.push(dataItem);
          });
        } else if (_self.options.serializeAs === 'list') {
          data = [];
          var $commBlocks = _self.$form.find('.form-block');

          $.each($commBlocks, function () {
            $fields = $(this).find('input, select, textarea');
            var dataItem = {};

            $.each($fields, function () {
              var $el = $(this),
                key = $el.attr('name');

              if (
                $el.prop('tagName') === 'TEXTAREA' &&
                $el.siblings('[id^="cke_textarea"]').length
              ) {
                var selector = $el.attr('id');
                value = CKEDITOR.instances[selector].getData();

                dataItem[key] = value;
                return true;
              }

              switch ($el.data('type')) {
                case 'int':
                  value = parseInt($el.val());
                  break;
                case 'string':
                  value = $el.val().toString();
                  break;
                case 'bool':
                  value = $el.prop('checked') === true;
                  break;
                default:
                  value = $el.val();
              }

              dataItem[$el.attr('name')] = value;
            });

            data.push(dataItem);
          });
        } else {
          if (!$.isEmptyObject(_self.options.pageForms)) {
            var data = {};

            $.each(_self.options.pageForms.singleForms.selectors, function (
              idx,
              el
            ) {
              var $sf = $(el + ' .smart-form');

              $.extend(data, _self._collectData($sf));
            });

            $.each(_self.options.pageForms.tabForms.selectors, function (
              idx,
              el
            ) {
              data[_self.options.pageForms.tabForms.groupBy] =
                data[_self.options.pageForms.tabForms.groupBy] || [];

              var $tf = $(el + ' .smart-form');

              $.each($tf, function () {
                var $f = $(this);

                var tabContentId = $f.closest('div.ui-tabs-panel').attr('id');
                var $navLi = $f
                  .closest('div.ui-tabs-panel')
                  .siblings('.ui-tabs-nav')
                  .find('li [href="#' + tabContentId + '"]')
                  .parent('li');
                if (_self.options.trackChanges && !$navLi.hasClass('changed'))
                  return true;

                data[_self.options.pageForms.tabForms.groupBy].push(
                  _self._collectData($f)
                );
              });
            });
          } else {
            $fields = _self.$form.find('input, select, textarea');
            data = {};

            $.each($fields, function () {
              var $el = $(this),
                key = $el.attr('name'),
                value;

              if (
                $el.prop('tagName') === 'TEXTAREA' &&
                $el.siblings('[id^="cke_textarea"]').length
              ) {
                var selector = $el.attr('id');
                value = CKEDITOR.instances[selector].getData();

                data[key] = value;
                return true;
              }

              if ($el.data('spec') === 'JSON') {
                data[key] = JSON.parse($el.val());
                return true;
              }

              if (key) {
                switch ($el.data('type')) {
                  case 'int':
                    value = parseInt($el.val());
                    break;
                  case 'string':
                    value = $el.val().toString();
                    break;
                  case 'bool-option':
                    value = $el.val().toString() === 'true';
                    break;
                  case 'bool':
                    value = $el.prop('checked') === true;
                    break;
                  default:
                    value = $el.val();
                }

                data[key] = value;
              }
            });
          }
        }

        $.ajax({
          url:
            _self.options.url +
            '?TimeZone=' +
            new Date().getTimezoneOffset() / -60 +
            '&LanguageId=' +
            localStorage.getItem('LanguageId'),
          method: method,
          dataType: 'json',
          contentType: 'application/json; charset=utf-8',
          data: JSON.stringify({
            Controller: _self.options.Controller,
            Method: _self.options.Method,
            Token: localStorage.getItem('Token'),
            RequestObject: data,
          }),
          beforeSend: function () {
            _self.overlay = new Overlay(_self.$form);
            _self.overlay.show();
          },

          success: function (resp) {
            var code = resp.ResponseCode;
            //new Error({
            //    code: code,
            //    redirectUrl: _self.options.onErrorRedirectUrl
            //});

            if (code > 0) {
              _self.overlay.hide().destroy();

              //var notif = new Notify({
              //    title: 'Error',
              //    type: 'error',
              //    msg: resp.Description
              //});
              APP.notifyResponse(resp);
            } else if (code === 0) {
              if (_self.options.success.url) {
                _self.overlay.hide().destroy();
                var _message = '';

                if (!_self.options.success.field) {
                  _message = _self.options.success.message;
                } else if (_self.options.success.field === '#') {
                  _message = _self.options.success.message.replace(
                    /\%[A-Z]+\%/,
                    _self.options.success.fieldReplacer
                  );
                } else {
                  _message = _self.options.success.message.replace(
                    /\%[A-Z]+\%/,
                    data[_self.options.success.field]
                  );
                }

                localStorage.setItem('successMessage', _message);
                window.location.href = _self.options.success.url;

                if (_self.options.forceRefresh) {
                  setTimeout(function () {
                    location.reload();
                  }, 500);
                } else {
                  $('html, body').animate(
                    {
                      scrollTop: 0,
                    },
                    500
                  );
                }
              } else {
                if (_self.options.success.action) {
                  var _message = '';

                  if (!_self.options.success.field) {
                    if (_self.options.success.message) {
                      _message = _self.options.success.message;
                    } else {
                      if (
                        resp.RespObject &&
                        !isNaN(parseInt(resp.RespObject))
                      ) {
                        // check if number //typeof resp.RespObject == 'number') {
                        APP.notifyResponse(resp);
                        _self.overlay.hide().destroy();
                        return true;
                      } else _message = resp.Description;
                    }
                  } else if (_self.options.success.field === '#') {
                    _message = _self.options.success.message.replace(
                      /\%[A-Z]+\%/,
                      _self.options.success.fieldReplacer
                    );
                  } else {
                    if (!_self.options.success.complexNotification) {
                      _message = _self.options.success.message.replace(
                        /\%[A-Z]+\%/,
                        data[_self.options.success.field]
                      );
                    } else {
                      _message =
                        '" ' +
                        data[_self.options.success.field] +
                        '" ' +
                        resp.Description;
                    }
                  }

                  var notif = new Notify({
                    title: 'Success',
                    type: 'success',
                    msg: _message,
                  });

                  _self.options.success.action();
                } else {
                  var notif = new Notify({
                    title: 'Success',
                    type: 'success',
                    msg: _self.options.success.message,
                  });
                }

                _self.overlay.hide().destroy();
              }
            }

            $('#ribbon .loading').addClass('hidden');
          },
        });
      });
    },
  };

  !window.FormBody && (window.FormBody = FormBody);
})(window, jQuery);
