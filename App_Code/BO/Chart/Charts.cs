using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for Charts
/// </summary>
/// 
public class TenderGraphData {
    public string TenderStatus { get; set; }
    public int StatusCount { get; set; }
}
public class ChartDataMatrix {
    public FilteredData data {get;set;}
}
public class FilteredData
{
    public string ParameterName { get; set; }
    public string ParameterValue { get; set; }
    public string FilterId { get; set; }
    public string SeriesNumber { get; set; }
}
public class ChartData {
public string ParameterName { get; set; }
public int ParameterValue { get; set; }
public string FilterId { get; set; }
}


public class FilterSeries {
public string FilterId { get; set; }
public string FilterType { get; set; }
 public int No { get; set; }
}

public class Sunburst {
    public string Id { get; set; }
    public string Parent { get; set; }
    public string Name { get; set; }
    public int Value { get; set; }
    public string Color { get; set; }

    public static List<ChartData> ReturnFilteredData(int id) {
        switch (id) {
            case 1:
                return Charts.GetDataByTenderType(id);
            case 2:
                return Charts.GetDataByLocation();
            case 3:
                return Charts.GetDataByStatus();
            default:
                return Charts.GetDataByLocation();
        }
    }
}

public class Charts
{
    public int BudgetCount { get; set; }
    public int FirmCount { get; set; }

    public static DataTable GetDistinctColumnValues(string columnName) {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetDistinctColumnValues", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@columnName", columnName);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable GetTenderCount(string columnNameToCount,string whereClause,string groupByClause) {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("FilterTenderByParameters", con);
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@ColumnNameToCount", columnNameToCount);
        cmd.Parameters.AddWithValue("@WhereClause", whereClause);
        cmd.Parameters.AddWithValue("@groupByClause", groupByClause);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;
    }

    public static DataTable GetChartFilter() {

        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        SqlCommand cmd = new SqlCommand("GetFilterMaster", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        DataTable dt = new DataTable();
        da.Fill(dt);
        return dt;

    }

    public static List<ChartData> GetDataByTenderType(int FilterType) {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("FilterTenderByParameters", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@FilterType", FilterType);
        SqlParameter budgetCount = new SqlParameter("@BUDGETCOUNT", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(budgetCount);
        SqlParameter firmCount = new SqlParameter("@FIRMCOUNT", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(firmCount);
        SqlParameter win = new SqlParameter("@WIN", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(win);
        SqlParameter loss = new SqlParameter("@LOSS", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(loss);
        SqlParameter inProgress = new SqlParameter("@INPROGRESS", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(inProgress);
        cmd.ExecuteReader();

        List<ChartData> chart = new List<ChartData>();
        ChartData c = new ChartData();
        c.ParameterName = "Budget";
        c.ParameterValue = Convert.ToInt32(budgetCount.Value);
        chart.Add(c);

        ChartData c1 = new ChartData();
        c1.ParameterName = "Firm";
        c1.ParameterValue = Convert.ToInt32(firmCount.Value);
        chart.Add(c1);

     
        con.Close();
        
        return chart;
    }

    public static List<ChartData> GetDataByLocation()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("FilterTenderByParameters", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@FilterType", 2);
        SqlParameter budgetCount = new SqlParameter("@BUDGETCOUNT", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(budgetCount);
        SqlParameter firmCount = new SqlParameter("@FIRMCOUNT", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(firmCount);
        SqlParameter winCount = new SqlParameter("@WIN", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(winCount);
        SqlParameter lossCount = new SqlParameter("@LOSS", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(lossCount);
        SqlParameter progressCount = new SqlParameter("@INPROGRESS", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(progressCount);
        DataTable dt = new DataTable();
        da.Fill(dt);
        List<ChartData> data = new List<ChartData>();
        foreach (DataRow row in dt.Rows) {
            ChartData c = new ChartData();
            c.ParameterName= row["LocationCode"].ToString();
            c.ParameterValue = Convert.ToInt32(row["TenderCount"]);
            data.Add(c);
        }
        return data;
    }

    public static List<ChartData> GetDataByStatus()
    {
        SqlConnection con = new SqlConnection(DataConnection.GetConnectionString());
        con.Open();
        SqlCommand cmd = new SqlCommand("FilterTenderByParameters", con);
        cmd.CommandType = CommandType.StoredProcedure;
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        cmd.Parameters.AddWithValue("@FilterType", 3);
        SqlParameter budgetCount = new SqlParameter("@BUDGETCOUNT", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(budgetCount);
        SqlParameter firmCount = new SqlParameter("@FIRMCOUNT", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(firmCount);
        SqlParameter winCount = new SqlParameter("@WIN", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(winCount);
        SqlParameter lossCount = new SqlParameter("@LOSS", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(lossCount);
        SqlParameter progressCount = new SqlParameter("@INPROGRESS", SqlDbType.Int, 100) { Direction = ParameterDirection.Output };
        cmd.Parameters.Add(progressCount);
        cmd.ExecuteReader();

        List<ChartData> chart = new List<ChartData>();
        ChartData c = new ChartData();
        c.ParameterName = "Win";
        c.ParameterValue = Convert.ToInt32(winCount.Value);
        chart.Add(c);

        ChartData c1 = new ChartData();
        c1.ParameterName = "Loss";
        c1.ParameterValue = Convert.ToInt32(lossCount.Value);
        chart.Add(c1);

        ChartData c2 = new ChartData();
        c2.ParameterName = "In Progress";
        c2.ParameterValue = Convert.ToInt32(progressCount.Value);
        chart.Add(c2);

        con.Close();
        return chart;
    }
}