module PaginationHelper
  def with_pagination_meta(json, data, field_name: :pagination_meta)
    json.__send__(field_name.to_sym) {
      pagination_data(json, data)
    }
    yield if block_given?
  end

  def pagination_data(json, data)
    json.total data.total_count
    json.current data.current_page
    json.pageSize data.limit_value
  end
end
