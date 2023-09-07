import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./paginate";
import queryString from "query-string";

export const TableLoai = () => {
  const [provinces, setProvinces] = useState([]);
  const reanderData = localStorage.getItem("getDangNhap");
  const Url = "https://wlp.howizbiz.com";
  const [TotalLoai, setTotalLoai] = useState({
    page: 1,
    itemsPerPage: 10,
    total: 363,
  });
  const [filters, setFilter] = useState({
    paginate: true,
    page: 1,
    perpage: 10,
  });
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paramString = queryString.stringify(filters);
        const response = await axios.get(
          `https://wlp.howizbiz.com/api/species?${paramString}&with=roles,createdBy&search=&inactive=-1`,
          {
            headers: {
              Authorization: `Bearer ${reanderData}`,
            },
          }
        );
        const { list, pagination } = response.data;
        setProvinces(list);
        setTotalLoai(pagination);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [filters, reanderData]);

  function handlePageChange(newPage) {
    setFilter({
      ...filters,
      page: newPage,
    });
  }

  function handlePerPageChange(event) {
    const newPerPage = parseInt(event.target.value, 10);
    setFilter({
      ...filters,
      page: 1,
      perpage: newPerPage,
    });
  }

  const handleDeleteClick = (name, id) => {
    setItemToDelete({ name, id });

    document.getElementById("Delete").classList.add("show");
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete && itemToDelete.id) {
      try {
        await axios.delete(
          `https://wlp.howizbiz.com/api/species/${itemToDelete.id}`,
          {
            headers: {
              Authorization: `Bearer ${reanderData}`,
            },
          }
        );

        document.getElementById("Delete").classList.remove("show");
        setFilter({
          ...filters,
          page: 1,
        });
      } catch (error) {
        console.error("Lỗi khi xóa mục:", error);
      }
    }
  };
  return (
    <div>
      <table className="tableLoai">
        <thead>
          <tr
            className="row"
            style={{ borderBottom: "solid", borderColor: "#bbbbbb" }}
          >
            <td className="col-sm-2">
              <strong>Tên</strong>
            </td>
            <td className="col-sm">
              <strong>Tên khoa học</strong>
            </td>
            <td className="col-sm">
              <strong>Giới</strong>
            </td>
            <td className="col-sm">
              <strong>ngành</strong>
            </td>
            <td className="col-sm">
              <strong>Lớp</strong>
            </td>
            <td className="col-sm">
              <strong>Bộ</strong>
            </td>
            <td className="col-sm">
              <strong>Họ</strong>
            </td>
            <td className="col-sm">
              <strong>Chi</strong>
            </td>
            <td className="col-sm">
              <strong>Hành động</strong>
            </td>
          </tr>
        </thead>
        <tbody id="getUser">
          {provinces.map((province) => (
            <tr key={province.id} className="row CallTable">
              <td className="col-sm-2">
                <img
                  src={
                    Url +
                    (province.attachments[0] && province.attachments[0].path
                      ? province.attachments[0].path
                      : "/static/img/favicon.e4ca0e6e.png")
                  }
                  className="card-img-top"
                  alt="..."
                />
                <strong>{province.ten}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.kingdom.ten}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.phylumn.ten}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.class.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.order.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.family.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm">
                <strong>{province.genus.ten_khoa_hoc}</strong>
              </td>
              <td className="col-sm iconTable" style={{ display: "flex" }}>
                <p
                  className="text-danger"
                  data-bs-toggle="modal"
                  onClick={() => handleDeleteClick(province.name, province.id)}
                  data-bs-target="#Delete"
                >
                  <i className="fa-solid fa-trash" />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal" id="Delete">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h4 className="modal-title ">Bạn có chắc chắn không?</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body">
              <p>
                Bạn có chắc muốn xóa
                <strong>{itemToDelete && itemToDelete.id}</strong>
                Điều này hoàn toàn không thế hoàn tác!
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Không
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
              >
                áp dụng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="perPage">
        <Pagination pagination={TotalLoai} onPageChange={handlePageChange} />
        <div className="items-per-page">
          <select
            id="itemsPerPage"
            value={filters.perpage}
            onChange={handlePerPageChange}
          >
            <option value="5">5 / trang</option>
            <option value="10">10 / trang</option>
            <option value="25">25 / trang</option>
            <option value="50">50 / trang</option>
          </select>
        </div>
      </div>
    </div>
  );
};
