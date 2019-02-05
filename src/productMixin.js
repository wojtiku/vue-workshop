export const createMixin = function (name, service)
{

  const loading = name + `IsLoading`
  const error = name + `IsError`
  const method = name + 'Fetch'

  return {
    data () {
      return {
        [name]: {},
        [loading]: false,
        [error]: false,
      }
    },
    methods: {
      [method] () {
        this[loading] = true
        this[error] = false

        if (this.id >= 0) {
          service(this.id)
            .then((p) => this[name] = p)
            .catch(() => this[error] = true)
            .then(() => this[loading] = false)
        } else {
          this[name] = {}
          this[loading] = false
          this[error] = true
        }
      },
    },
    created () {
      this[method]()
    },
    watch: {
      id () {
        this[method]()
      },
    },
  }
}