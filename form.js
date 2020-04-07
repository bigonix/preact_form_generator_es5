var SmartForm = (function (preact, htm) {
  var Component = preact.Component;
  var render = preact.render;
  var html = htm.bind(preact.h);

  var Form = (function (_Component) {
    _inherits(Form, _Component);
    var _super = _createSuper(Form);

    function Form(props) {
      _classCallCheck(this, Form);
      _super.call(this);

      var _self = this;

      var _state = stateFromProps(props.options);
      this.state = _state;

      Object.keys(_state).forEach(function (k) {
        _self[`on${k}Change`] = function (e) {
          var _value = e.target.value;

          var _stateChunk = {};
          _stateChunk[k] = _value;

          _self.setState(_stateChunk);
        }.bind(_self);
      });
    }

    function htmlFromProps(props, _component) {
      if (props.blocks) {
        return props.blocks.map(function (p) {
          var _html = html`
            <${p.type}>
              ${htmlFromProps(p, _component)}
            </${p.type}>`;

          return _html;
        });
      }

      if (props.rows) {
        return props.rows.map(function (p) {
          return html`<div class="row">
            ${htmlFromProps(p, _component)}
          </div>`;
        });
      }

      if (props.cols) {
        return props.cols.map(function (p) {
          return html`<div class="${p.className}">
            ${htmlFromProps(p, _component)}
          </div>`;
        });
      }

      if (props.formEntities) {
        return props.formEntities.map(function (p) {
          if (p.elemType === 'label') {
            return html`<label>${p.text} ${p.required ? '*' : ''}</label>`;
          }

          if (p.elemType === 'input') {
            return html`<input
              type="${p.type || 'text'}"
              onChange="${_component[`on${p.name}Change`]}"
              value="${_component.state[p.name] || ''}"
              placeholder="${p.placeholder || ''}"
            />`;
          }

          if (p.elemType === 'note') {
            return html`<span>${p.text}</span>`;
          }

          if (p.elemType === 'button') {
            return html` <button ${p.type ? `type=${p.type}` : ''}>
              ${p.text}
            </button>`;
          }
        });
      }

      if (props.options) {
        return props.options.map(function (p) {
          return html`<form
            onSubmit=${function (e) {
              e.preventDefault();
              return p.onSubmit(_component.state);
            }}
          >
            ${htmlFromProps(p, _component)}
          </form>`;
        });
      }
    }

    function stateFromProps(props, state) {
      state = state || {};

      if (Array.isArray(props)) {
        props.forEach(function (p) {
          return stateFromProps(p, state);
        });
      } else {
        var ps = props.blocks || props.rows || props.cols;

        if (ps) {
          ps.forEach(function (p) {
            return stateFromProps(p, state);
          });
        }

        if (props.formEntities) {
          props.formEntities.forEach(function (fe) {
            if (['input'].includes(fe.elemType)) {
              state[fe.name] = fe.value || null;
            }
          });
        }
      }

      return state;
    }

    Form.prototype.render = function (props) {
      return htmlFromProps(props, this);
    };
    return Form;
  })(Component);

  Form.renderDOM = function (MOUNT_NODE, options) {
    render(html`<${Form} options=${options} />`, MOUNT_NODE);
  };

  return Form;
})(preact, htm);
