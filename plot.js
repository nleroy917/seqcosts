var plotSequenceCosts = async (plotElement, width=800, height=400) => {
  // retrieve data
  var seqCostData = await fetch("https://databio.org/seqcosts/data/sequencing_cost.csv").then(
    response => response.text()).then(
    response => { 
      return response
    })

  var linePlot = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { 
      "values": seqCostData,
      "format": {
        "type": "csv", 
      }
    },
    "title": "Sequencing costs over time",
    "mark": "line",
    "width": width,
    "height": height,
    "encoding": {
      "y": {
        "field": "cost_per_mb",
        "type": "quantitative",
        "scale": {"type": "log"},
        "axis": {
          "title": "Cost per MB ($)",
          "labels": null
        }
      },
      "x": {
        "field": "date",
        "type": "temporal",
        "timeUnit": "utcyearmonthdate",
        "axis": {
          "title": "Date",
          "labelAngle": -90 
        }
      }
    }
  }

  vegaEmbed('#'+plotElement, linePlot)
}

var plotSRAStats = async (plotElement, width=800, height=300) => {
  // retrieve data
  var sraData = await fetch(
    "https://databio.org/seqcosts/data/sra_stat.csv").then(
    response => response.text()).then(
    response => { 
      return response
    })

  var linePlot = {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "data": { 
      "values": sraData,
      "format": {
        "type": "csv", 
      }
    },
    "title": "Sequence Read Archive growth",
    "mark": "line",
    "width": width,
    "height": height,
    "transform": [
      { 
        "calculate": "datum.bytes / 1000000000000",
        "as": "terabytes"
      }
    ],
    "encoding": {
      "y": {
        "field": "terabytes",
        "type": "quantitative",
        "scale": {"type": "log"},
        "axis": {
          "title": "TeraBytes in SRA",
          "labels": null
        }
      },
      "x": {
        "field": "date",
        "type": "temporal",
        "timeUnit": "utcyearmonthdate",
        "axis": {
          "title": "Date",
          "labelAngle": -90 
        }
      }
    }
  }

  vegaEmbed('#'+plotElement, linePlot)
}
